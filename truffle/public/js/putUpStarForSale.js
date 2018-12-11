function putUpStarForSale(){
    var data = {}
    data.address = document.getElementsByName('address')[0].value;
    data.starId = document.getElementsByName('starId')[0].value;
    data.price = document.getElementsByName('price')[0].value;

    data.weiPrice = web3.toWei(data.price, "ether")

    console.log(data)

    starNotary.putStarUpForSale(data.starId, data.weiPrice, {from: data.address}, function(error, result){
        if(!error){
            console.log(JSON.stringify(result));
            document.getElementById('msg').innerHTML = "Star placed for sale successfully";
        }
    })
}