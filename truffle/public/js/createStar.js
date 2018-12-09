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

console.log(abi)
var StarNotary = web3.eth.contract(abi)
var starNotary = StarNotary.at('0xB7FdE4215432B012c3F3E18716760e018e97EEf5');

function createContractClicked() {
    web3.eth.getAccounts(function(error, accounts) {
        if (error) {
            return
        }
        var account = accounts[0]
        createContract(account)
    })
}

function createStar(account){
    var data = {}
    data.address = document.getElementsByName('address')[0].value;
    data.star = {}
    const name = document.getElementsByName('name')[0].value;
    const RAH = document.getElementsByName('RAH')[0].value;
    const RAM = document.getElementsByName('RAM')[0].value;
    const RASEC = document.getElementsByName('RASEC')[0].value;
    const DecDeg = document.getElementsByName('DecDeg')[0].value;
    const DecMin = document.getElementsByName('DecMin')[0].value;
    const DecSec = document.getElementsByName('DecSec')[0].value;
    const Conste = document.getElementsByName('Conste')[0].value;
    const MAG = document.getElementsByName('MAG')[0].value;
    //const Story = coder.utf8ToHex(req.body.Story);
    const Story = document.getElementsByName('Story')[0].value;

    data.star.dec =  'dec_' + RAH + '° ' + RAM +  "' " +  RASEC
    data.star.ra = 'ra_' + DecDeg + 'h ' + DecMin + 'm ' + DecSec + 's'

    if (MAG != '' || MAG != undefined){
        data.star.mag = 'mag_' + MAG
    }

    if (Conste != '' && Conste != undefined){
        data.star.const = Conste
    }

    starNotary.createStar(data.name, data.story, data.ra, data.dec, data.mag, 1, {from: account}, function(error, result){
    if(!error)
        console.log(JSON.stringify(result));
    else
        console.error(error);
    })
}

function claimButtonClicked() {
    document.getElementById('msg').innerHTML = 'Create Star';
    web3.eth.getAccounts(function(error, accounts) {
        if (error) {
            console.log(error)
            return
        }
        var account = accounts[0]
        document.getElementById('msg').innerHTML = account;
        console.log(accounts)

        createStar(account)

        //console.log(star)
        //star.createStar("test", "starStory", "ra", "dec", "mag", 1, {from : account})
        // starNotary.createStar(function (error, result) {
        //     if(error){
        //         document.getElementById('msg').innerHTML = 'error occurred creating a star';
        //     }
        //     // if (!error) {
        //     //     var starClaimedEvent = starNotary.starClaimed({from: account});
        //     //     starClaimedEvent.watch(function(error, result) {
        //     //         if (!error) {
        //     //             location.reload();
        //     //         } else {
        //     //             console.log('watching for star claimed event is failing');
        //     //         }
        //     //     });
        //     // } else {
        //     //     console.log(error);
        //     // }
        // });
    })
}