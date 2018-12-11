function buyStar(){
    var data = {}
    data.address = document.getElementsByName('address')[0].value;
    data.starId = document.getElementsByName('starId')[0].value;
    data.price = document.getElementsByName('price')[0].value;
    data.weiPrice = web3.toWei(data.price, "ether")

    starNotary.buyStar(data.starId, {from: data.address, value: data.weiPrice}, function(error, result){
    if(!error){
        console.log(JSON.stringify(result));
        document.getElementById('msg').innerHTML = "Order placed successfully";
    }
    else
        console.error(error);
    })
}