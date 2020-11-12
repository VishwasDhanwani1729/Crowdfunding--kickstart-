/* 
    in prev. projects we were compiling our contract each n every time which is not good
    in this project we would compile our contract and store the compiled file into BUILD folder and whenever we want to use interface and bytecode we would use that compiled file. if any changes occur in contract then we would compile again and delete the previous compiled file from BUILD
*/
const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname,"build");  //reference to the BUILD folder
fs.removeSync(buildPath);   // will delete BUILD folder inculding its file

const campaignPath = path.resolve(__dirname,"contracts","Campaign.sol"); //reference to contract - Campaign file
const source = fs.readFileSync(campaignPath,'utf-8');   //will read the contract

const output = solc.compile(source,1).contracts;    // output will be a array referencing to 2 contracts inside our Campaign.solc
console.log(output);
fs.ensureDirSync(buildPath);    // will create the given folder, if it doesn't exist

for(let contract in output){
    //if we won't write the upcoming line (i.e., let name.....) it won't compile bcz filename will start with ':' (don't work in windows) so we should remove colon
    let name = contract.replace(':','');
    fs.outputJSONSync(      //will store data in json file 
        path.resolve(buildPath,name+'.json'),   //path for the file
        output[contract]        // the actual data      
    );
}