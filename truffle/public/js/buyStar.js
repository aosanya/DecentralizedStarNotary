if(typeof web3 != 'undefined') {
    web3 = new Web3(web3.currentProvider) // what Metamask injected
    console.log(web3.currentProvider)
} else {
    // Instantiate and set Ganache as your provider
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"));
}
// The default (top) wallet account from a list of test accounts
web3.eth.defaultAccount = web3.eth.accounts[0];

// The interface definition for your smart contract (the ABI)
var StarNotary = web3.eth.contract(abi)
var starNotary = StarNotary.at('0xB7FdE4215432B012c3F3E18716760e018e97EEf5');

function putUpStarForSale(){
    var data = {}
    data.address = document.getElementsByName('address')[0].value;
    data.starId = document.getElementsByName('starId')[0].value;

    if (Conste != '' && Conste != undefined){
        data.star.const = Conste
    }

    starNotary.buyStar(data.starId, {from: data.address}, function(error, result){
    if(!error)
        console.log(JSON.stringify(result));
    else
        console.error(error);
    })
}