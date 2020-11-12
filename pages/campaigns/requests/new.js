import React, { Component } from 'react';
import Layout from '../../../components/Layout.js';
import { Form, Button, Message, Input } from 'semantic-ui-react';
import Campaign from '../../../Ethereum/campaign.js';
import web3 from '../../../Ethereum/web3.js';
import { Link, Router } from '../../../routes.js';
class newRequest extends Component {
    static async getInitialProps(props) {
        const add = props.query.address;
        return { address: add };
    }
    state = {
        value: '',
        description: '',
        recepient: '',
        erroMessage : '',
        loading:false
    }
    onSubmit=async(event)=>{
        this.setState({loading:true})
        event.preventDefault();
        const address = this.props.address;
        const {value,description,recepient} = this.state;
        try{
            const campaign = Campaign(address);
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.createRequest(web3.utils.toWei(value,'ether'),description,recepient).send({
                from : accounts[0]
            });
            Router.pushRoute(`/campaigns/${this.props.address}`);
        }catch(err){
            this.setState({erroMessage : err.message});
        }
        this.setState({loading:false});
    };
    render() {
        return (
            <Layout>
                <h3>Create a Request</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.erroMessage}>
                    <Form.Field>
                        <label>Description</label>
                        <Input value={this.state.description} onChange={event=>{this.setState({description : event.target.value})}} />
                    </Form.Field>
                    <Form.Field>
                        <label>Value in Ether</label>
                        <Input label="ether" labelPosition="right" value={this.state.value} onChange={event=>{this.setState({value : event.target.value})}}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Receipent</label>
                        <Input value={this.state.recepient} onChange={event=>{this.setState({recepient : event.target.value})}}/>
                    </Form.Field>
                    <Message error header="Oops.." content={this.state.erroMessage}/>
                    <Button loading={this.state.loading} primary>Create</Button>
                </Form>
            </Layout>
        );
    }
}

export default newRequest;