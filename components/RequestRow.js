import React, { Component } from 'react';
import {Table,Button} from 'semantic-ui-react';
import web3 from '../Ethereum/web3.js';
import Campaign from '../Ethereum/campaign.js';
import Router from '../routes.js';
class RequestRow extends Component{
    approve= async()=>{
        const campaign = Campaign(this.props.address);    
        const accounts = await web3.eth.getAccounts();
        await campaign.methods.approveRequest(this.props.id).send({
            from : accounts[0]
        });
        Router.replaceRoute(`/campaigns/${this.props.address}/requests`);
    };
    finalize= async()=>{
        const campaign = Campaign(this.props.address);    
        const accounts = await web3.eth.getAccounts();
        await campaign.methods.finalizeRequest(this.props.id).send({
            from : accounts[0]
        });
        Router.replaceRoute(`/campaigns/${this.props.address}/requests`);
    }
    render(){
        const {Row,Cell}=Table;
        const {id,request,approversCount} = this.props;
        return(
            <Row disabled={request.complete}>
                <Cell>
                    {id + 1}
                </Cell>
                <Cell>
                    {request.description}
                </Cell>
                <Cell>
                    {web3.utils.fromWei(request.value,'ether')}
                </Cell>
                <Cell>
                    {request.recipient}
                </Cell>
                <Cell>
                    {request.approvalCount}/{approversCount}
                </Cell>
                {   request.complete ? null :
                    (<Cell>
                        <Button color="green" basic onClick={this.approve}>Approve</Button>
                    </Cell>)
                }
                {   request.complete ? null :
                    (<Cell>
                        <Button color="teal" basic onClick={this.finalize}>
                            Finalize
                        </Button>
                    </Cell>)
                }
            </Row>
        );
    }
}
export default RequestRow;