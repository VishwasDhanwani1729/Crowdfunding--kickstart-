import React,{Component} from 'react';
import {Form,Button,Input,Message} from 'semantic-ui-react';
import Web3 from 'web3';
import Layout from '../../components/Layout.js'
import web3 from '../../Ethereum/web3.js';
import factory from '../../Ethereum/factory.js'
import {Router} from '../../routes.js';
class CampaignNew extends Component{
    state={
        minimumContribution : '',
        errorMessage:'',
        loading:false       //for spinner in button
    }
    onSubmit= async (event)=>{
        event.preventDefault();
        this.setState({loading : true , errorMessage:''});
        try{
            const accounts = await web3.eth.getAccounts();
            await factory.methods.createCampaign(this.state.minimumContribution).send({
                from : accounts[0]
            });
            Router.pushRoute('/');
        }catch(err){
            this.setState({errorMessage : err.message});
            
        }
        this.setState({loading:false})
    };
    render(){
        //!"sdfds" return false
        //!!"sdfds" returns true
        return   (
            <Layout>
                <h1>Create a Campaing</h1>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Minimum Contribution</label>
                        <Input
                            label="wei"
                            labelPosition="right"
                            value={this.state.minimumContribution}
                            onChange={event=>this.setState({minimumContribution:event.target.value})}
                        />
                    </Form.Field>
                    <Message error header="Oops" content={this.state.errorMessage}/>
                    <Button loading={this.state.loading} primary>Create!</Button>
                </Form>
            </Layout>
        );
    }

}
export default CampaignNew;