pragma solidity ^0.4.17;

contract CampaignFactory{
    address[] public deployCampaign;
    function createCampaign(uint min) public{
        address newCampaign = new Campaign(msg.sender,min);
        deployCampaign.push(newCampaign);
    }
    function getDeployedCampaign() public view returns (address[]){
        return deployCampaign;
    }
}

contract Campaign{
    
    struct Request{
        string description;
        address recipient;
        uint value;
        bool complete;
        uint approvalCount;
        mapping(address=>bool) approvals;
    }
    
   // uint public amount;
    address public manager;     //person who is depoloying this contract
    uint public minimumContribution;    //min contribution each person should make
    
    //address[] public approvers;     all the persons who are contributing  in the projects are approvers
    mapping(address=>bool) public approvers;   //mapping is used, if array is used then while checking who have approved for request will cost a lot of gas
    
    Request[] public requests;  //manager creates request and describes the details 
    uint public approversCount;
    
    
    modifier restrict(){
        require(msg.sender==manager);
        _;
    }
    
    function Campaign(address creator,uint min) public{
        manager = creator;
        minimumContribution = min;
        approversCount=0;
       // amount=0;
    }
    function contribute() public payable{
        require(msg.value>=minimumContribution);
        approvers[msg.sender]=true;
       // amount+=msg.value;
        approversCount++;
    }
    function createRequest(uint value,string description,address recipient)public restrict{
        //require(msg.sender==manager);
        Request memory newRequest=Request({     // memory will create a new copy while storage will use the existing copy
            description : description,
            recipient : recipient,
            value : value,
            complete : false,
            approvalCount : 0
            // we won't intialize approvals bcz it is reference type (they don't need) while others are value types
        });
        /*OTHER WAY
            Request newRequest;
            newRequest.description = description;
            newRequest.recipient = recipient;
            newRequest.value = value;
            newRequest.complete = false;
        */
        requests.push(newRequest);
    }
    function approveRequest(uint index)public{
        Request storage request = requests[index];
        
        require(index<requests.length);
        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);    //checking if the user has already voted, if voted then don't allow it to vote again

        request.approvals[msg.sender]=true;
        request.approvalCount++;
    }
    
    function finalizeRequest(uint index)public restrict {
        Request storage request = requests[index];
        require(!request.complete); // it is true then it means that is already done no need to do it again
        require(request.approvalCount > (approversCount / 2));   // min half of votes of contributer is required for a request to execute
        request.recipient.transfer(request.value);  //send money to the recipient
        //amount-=request.value;
        request.complete=true;
        
    }
    function getSummary() public view returns(
        uint,uint,uint,uint,address
    ){
        return (
            minimumContribution,
            this.balance,
            requests.length,
            approversCount,
            manager
        );
    }
    function getRequestCount() public view returns(uint){
        return requests.length;
    }
    
}