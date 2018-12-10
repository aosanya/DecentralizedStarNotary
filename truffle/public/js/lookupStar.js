if(typeof web3 != 'undefined') {
    web3 = new Web3(web3.currentProvider) // what Metamask injected
    console.log(web3.currentProvider)
} else {
    // Instantiate and set Ganache as your provider
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"));
}

// The interface definition for your smart contract (the ABI)
var StarNotary = web3.eth.contract(abi)
var starNotary = StarNotary.at('0xB7FdE4215432B012c3F3E18716760e018e97EEf5');

function lookupStar(){
    const starID = document.getElementsByName('starId')[0].value;

    starNotary.tokenIdToStarInfo(starID, function(error, result){
        if(!error){
            document.getElementById('details').innerHTML = JSON.stringify(result);
        }
        else{
            document.getElementById('msg').innerHTML = error;
        }
    })

    starNotary.starsForSale(starID, function(error, result){
        if(!error){
            if(result = "0"){
                document.getElementById('price').innerHTML = result// "Not for sale";
            }
            else{
                document.getElementById('price').innerHTML = "Selling @ " + result + "(wei)";
            }
        }
        else{
            document.getElementById('msg').innerHTML = error;
        }
    })
}