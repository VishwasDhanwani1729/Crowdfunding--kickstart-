import React, { Component } from 'react';
import Layout from '../../../components/Layout.js';
import {Link} from '../../../routes.js';
import {Button,Table} from 'semantic-ui-react';
import Campaign from '../../../Ethereum/campaign.js';
import web3 from '../../../Ethereum/web3.js';
import RequestRow from '../../../components/RequestRow.js';
class RequestIndex extends Component{
    static async getInitialProps(props){
        const add = props.query.address;
        const campaign = Campaign(add);

        const approversCount = await campaign.methods.approversCount().call();
        
        const requestCount = await campaign.methods.getRequestCount().call();
        
        const request=await Promise.all(
            Array(parseInt(requestCount))
                .fill()
                .map((element,index)=>{
                    return campaign.methods.requests(index).call();
                })
        );
  
        console.log(request+"#");
        return {address : add,request,requestCount, approversCount};
    }
   renderRows(){
       return(this.props.request.map((request,index)=>{
            return <RequestRow key={index} id={index} request={request} address={this.props.address} approversCount={this.props.approversCount}/>
       }));
   }
    render(){
        const {Header,Row,HeaderCell,Body} = Table;
        return(
            <Layout>
                <h3>Pending Request</h3>
                <Link route={`/campaigns/${this.props.address}/requests/new`}>
                    <a>
                        <Button primary floated="right" style={{marginBottom:10}}>Add Request</Button>
                    </a>
                </Link>
                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>Id</HeaderCell>
                            <HeaderCell>Description</HeaderCell>
                            <HeaderCell>Amount</HeaderCell>
                            <HeaderCell>Recipient</HeaderCell>
                            <HeaderCell>Approval Count</HeaderCell>
                            <HeaderCell>Approve</HeaderCell>
                            <HeaderCell>Finalize</HeaderCell>
                        </Row>
                    </Header>
                    <Body>
                        {this.renderRows()}
                    </Body>
                </Table>
                <div>Found {this.props.requestCount} Requests</div>
            </Layout>
        );
    }
}
export default RequestIndex;