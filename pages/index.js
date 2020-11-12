import React, { Component } from "react";
import { Card , Button } from "semantic-ui-react";
import factory from "../Ethereum/factory.js";
import Layout from "../components/Layout.js";
import {Link} from '../routes.js';
class CampaingIndex extends Component{
    static async getInitialProps(){
        const campaigns = await factory.methods.getDeployedCampaign().call();
        return { campaigns};
    }T
    renderCampaign(){
        const items = this.props.campaigns.map(address =>{
            return {
                header : address,
                description : (<Link route={`/campaigns/${address}`}>
                <a>View Campaign</a>
                </Link>),
                fluid : true        //will take whole width of the page
            };
        });
        return <Card.Group items={items}/>
    }
    render(){
        return(
            <Layout>
            <div>
                
            <h3>Open Campaigns</h3>
            <Link route='/campaigns/new'>
                <a>
                    <Button
                        content='Create Campaign'
                        icon="add circle"
                        floated = "right"
                        primary
                    />
                </a>
            </Link>
                {this.renderCampaign()}
            </div>
            </Layout>
        );
    }
}

export default CampaingIndex;   