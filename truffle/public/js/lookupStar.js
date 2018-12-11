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
            document.getElementById('starDetails').style.display = ""
            if(result = "0"){
                document.getElementById('price').innerHTML = "Not for sale";
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