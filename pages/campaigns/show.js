import React, { Component } from 'react';
import Layout from '../../components/Layout';
import { Card, Grid, Button } from 'semantic-ui-react';
import Campaign from '../../Ethereum/campaign.js';
import web3 from '../../Ethereum/web3.js';
import ContributeForm from '../../components/ContributeForm.js';
import { Link } from '../../routes.js';

class Show extends Component {
    static async getInitialProps(props) {
        const campaign = Campaign(props.query.address);
        const summary = await campaign.methods.getSummary().call();

        return {
            //can't access props.query.address out of this getInitialProps() so we would create a instance and return it
            address: props.query.address,
            minContribution: summary[0],
            balance: summary[1],
            requestCount: summary[2],
            approversCount: summary[3],
            manager: summary[4]
        };
    }
    renderCards() {
        const { minContribution,
            balance,
            requestCount,
            approversCount,
            manager } = this.props;
        const items = [
            {
                header: manager,
                meta: 'Address of manager',
                description: 'The manager created this campaign and can create request to withdraw money.',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: minContribution,
                meta: 'Minimum Contribution',
                description: 'This is the minimum contribution a person should contribute.',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: requestCount,
                meta: 'Number of Requests',
                description: 'A request tries to withdraw money from the contributor.'
            },
            {
                header: approversCount,
                meta: 'Number of approvers',
                description: 'Number of people who have already contributed.'
            },
            {
                header: web3.utils.fromWei(balance, 'ether'),
                meta: 'Campaign Balance(ether)',
                description: 'Total money contributed for the campaign.'
            }
        ]
        return <Card.Group items={items} />
    }
    render() {
        return (<Layout>
            <h3>Campaign Details</h3>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={10}>
                        {this.renderCards()}

                    </Grid.Column>
                    <Grid.Column width={6}>
                        <ContributeForm address={this.props.address} />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Link route={`/campaigns/${this.props.address}/requests`}>
                            <a>
                                <Button primary>
                                    View Requests
                                </Button>
                            </a>
                        </Link>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Layout>);
    }
}
export default Show;