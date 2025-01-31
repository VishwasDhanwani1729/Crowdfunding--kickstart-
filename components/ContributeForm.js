import React, { Component } from 'react';
import {Form,Input,Button,Message} from 'semantic-ui-react';
import Campaign from '../Ethereum/campaign.js';
import web3 from '../Ethereum/web3.js';
import Router from '../routes.js';
class ContributeForm extends Component{
    state={
        value : '',
        errorMessage:'',
        loading:false
    }
    onSubmit= async (event)=> {
        event.preventDefault();
        this.setState({loading:true,errorMessage:''});
        const campaign = Campaign(this.props.address);  //instance of campaign with the given address will be created

        try{
            //now we will contribute some ether to it
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.contribute().send({from:accounts[0],
                                                        value: web3.utils.toWei(this.state.value,'ether')});// we are inputing value in ether so it must be converted to wei

            // after contributing cards are not updated so to update them we will reload our page
                Router.replaceRoute(`/campaigns/${this.props.address}`);
        }catch(err){
            this.setState({errorMessage:err.message});
        }
        this.setState({loading:false , value:''});
    };
    render(){
        return(<Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
            <Form.Field>
                <label>Amount to Contribute</label>
                <Input label="ether"
                    labelPosition="right"
                    value={this.state.value}
                    onChange={event=>this.setState({value:event.target.value})}
                />
            </Form.Field>
            <Message error header="Oops.." content={this.state.errorMessage}/>
            <Button loading={this.state.loading} primary>Contribute</Button>
        </Form>);
    }
}

export default ContributeForm;