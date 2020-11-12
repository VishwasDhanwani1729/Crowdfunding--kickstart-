import web3 from './web3.js';
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x6bc21150d6d9bbe1F4B32f0FCfDfB5dD69f77e5D'    //contract is already deployed
);

export default instance;    //whenever we want to access our factory contract we would just import this .js file and access it using this instance variable