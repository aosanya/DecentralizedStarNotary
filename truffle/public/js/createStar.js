function createStar(){
    var data = {}
    data.address = document.getElementsByName('address')[0].value;
    data.star = {}
    data.tokenId = document.getElementsByName('tokenId')[0].value;

    data.name = document.getElementsByName('name')[0].value;
    const RAH = document.getElementsByName('RAH')[0].value;
    const RAM = document.getElementsByName('RAM')[0].value;
    const RASEC = document.getElementsByName('RASEC')[0].value;
    const DecDeg = document.getElementsByName('DecDeg')[0].value;
    const DecMin = document.getElementsByName('DecMin')[0].value;
    const DecSec = document.getElementsByName('DecSec')[0].value;
    const Conste = document.getElementsByName('Conste')[0].value;
    const MAG = document.getElementsByName('MAG')[0].value;
    //const Story = coder.utf8ToHex(req.body.Story);
    data.story = document.getElementsByName('Story')[0].value;

    data.star.dec =  'dec_' + RAH + '° ' + RAM +  "' " +  RASEC
    data.star.ra = 'ra_' + DecDeg + 'h ' + DecMin + 'm ' + DecSec + 's'

    if (MAG != '' || MAG != undefined){
        data.star.mag = 'mag_' + MAG
    }

    // const d = new Date();
    // const id = d.getTime();
    if (Conste != '' && Conste != undefined){
        data.star.const = Conste
    }

    console.log(data)
    starNotary.createStar(data.name, data.story, data.star.ra, data.star.dec, data.star.mag, data.tokenId, {from: data.address}, function(error, result){
    if(!error)
        console.log(JSON.stringify(result));
    else
        console.error(error);
    })
}