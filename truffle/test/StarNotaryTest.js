const StarNotary = artifacts.require('StarNotary')

contract('StarNotary', accounts => {

    let user1 = accounts[1]
    let user2 = accounts[2]
    let randomMaliciousUser = accounts[3]

    let name = 'awesome star!'
    let starStory = "this star was bought for my wife's birthday"

    let ra = "dec_1° 1' 1"
    let mag = "mag_1"
    let dec = "ra_1h 1m 1s"
    let starId = 1
    var starInstance
    beforeEach(async function() {
        starInstance = await StarNotary.new({from: accounts[0]})
    })

    describe('can create a star', () => {
        it('can create a star and get its name', async function () {
            await starInstance.createStar(name, starStory, ra, dec, mag, starId)
            let starInfo = await starInstance.tokenIdToStarInfo(1)
            assert.equal(starInfo[0], name)
        })
    })

    describe('can create a star production ids', () => {
        it('can create a star and get its name', async function () {
            let ra2 = "dec_2° 2' 2"
            let mag2 = "mag_2"
            let dec2 = "ra_2h 2m 2s"
            const d = new Date();
            const id2 = d.getTime();
            await starInstance.createStar(name, starStory, ra2, dec2, mag2, id2)
            let starInfo = await starInstance.tokenIdToStarInfo(id2)
            assert.equal(starInfo[0], name)
        })
    })

    describe('can check is star exists', () => {
        it('can create a star and confirm it exists', async function () {
            let ra2 = "dec_2° 2' 2"
            let mag2 = "mag_2"
            let dec2 = "ra_2h 2m 2s"
            const d = new Date();
            const id2 = d.getTime();
            await starInstance.createStar(name, starStory, ra2, dec2, mag2, id2)
            let exists = await starInstance.checkIfStarExist(ra2, dec2, mag2)
            assert.isTrue(exists)
        })
        it('confirm star does not exist', async function () {
            let ra2 = "dec_3° 2' 2"
            let mag2 = "mag_3"
            let dec2 = "ra_3h 2m 2s"
            let exists = await starInstance.checkIfStarExist(ra2, dec2, mag2)
            assert.isFalse(exists)
        })
    })

    describe('star uniqueness', () => {
        it('only stars unique stars can be minted', async function() {
            await starInstance.createStar(name, starStory, ra, dec, mag, starId)
            try{
                await starInstance.createStar(name, starStory, ra, dec, mag, starId)
            }
            catch (error){
                assert.isTrue(error.toString().includes("Error : Star already exists!"), "Unexpected throw recieved")
                return
            }
            assert.fail('Expected throw not recieved')
        })

        it('only stars unique stars can be minted even if their ID is different', async function() {
            await starInstance.createStar(name, starStory, ra, dec, mag, starId)
            try{
                await starInstance.createStar(name, starStory, ra, dec, mag, 2)
            }
            catch (error){
                assert.isTrue(error.toString().includes("Error : Star already exists!"), "Unexpected throw recieved")
                return
            }
            assert.fail('Expected throw not recieved')
        })

        it('minting unique stars does not fail', async function() {
            for(let i = 0; i < 10; i ++) {
                let id = i
                let newRa = i.toString()
                let newDec = i.toString()
                let newMag = i.toString()

                await starInstance.createStar(name, starStory, newRa, newDec, newMag, id, {from: user1})
                let starInfo = await starInstance.tokenIdToStarInfo(id)
                assert.equal(starInfo[0], name)
            }
        })
    })

    describe('buying and selling stars', () => {

        let starPrice = web3.toWei(.01, "ether")

        beforeEach(async function () {
            await starInstance.createStar(name, starStory, ra, dec, mag, starId, {from: user1})
        })

        it('user1 can put up their star for sale', async function () {
            await starInstance.putStarUpForSale(starId, starPrice, {from: user1})
            let starForSale = await starInstance.starsForSale(starId)
            assert.equal(starForSale, starPrice)
        })

        describe('user2 can buy a star that was put up for sale', () => {
            beforeEach(async function () {
                await starInstance.putStarUpForSale(starId, starPrice, {from: user1})
            })

            it('cannot buy star for lesser amount', async function() {
                assert.equal(await starInstance.ownerOf(starId), user1)
                try{
                    await starInstance.buyStar(starId, {from: user2, value: starPrice / 2})
                }
                catch (error){
                    assert.isTrue(error.toString().includes("Error : The offer is less than the star value"), "Unexpected throw recieved")
                    assert.equal(await starInstance.ownerOf(starId), user1)
                    return
                }
                assert.fail('Expected throw not recieved')
            })

            it('user2 is the owner of the star after they buy it', async function() {
                assert.equal(await starInstance.ownerOf(starId), user1)
                await starInstance.buyStar(starId, {from: user2, value: starPrice})
                assert.equal(await starInstance.ownerOf(starId), user2)
            })

            it('user2 ether balance changed correctly', async function () {
                let actualBalance = web3.eth.getBalance(user2);
                await starInstance.buyStar(starId, {from: user2, value: starPrice})

                let balanceAfter = web3.eth.getBalance(user2);
                let actualCost = actualBalance - balanceAfter
                let expectedGasPrice = actualCost - starPrice
                let actualGasUsed = web3.eth.getBlock(web3.eth.blockNumber).gasUsed
                //let weiGasUsed = web3.toWei(actualGasUsed, "Gwei")
                assert.equal(actualGasUsed, Number((expectedGasPrice/100000000000).toFixed(0)), "Gas difference can only stem from wrong account transfers")
            })
        })
    })

    describe('buying and selling stars as in frontend', () => {

        let starPrice = 500000000//web3.toWei(1, "wei")

        let ra3 = "dec_13° 13' 13"
        let mag3 = "mag_13"
        let dec3 = "ra_13h 13m 13s"
        let starId3 = 3

        beforeEach(async function () {
            await starInstance.createStar(name, starStory, ra3, dec3, mag3, starId3, {from: user2})
        })

        it('user1 can put up their star for sale', async function () {
            starInstance.putStarUpForSale(starId3, starPrice, {from: user2}, function(error, result){
            if(!error){
                starInstance.starsForSale(starId3, function(error, result){
                    assert.equal(result, starPrice)
                    return
                })
            }
            assert.fail('expected an error, but none was found' + error);
            })
        })

        describe('user2 can buy a star that was put up for sale', () => {
            it('user2 is the owner of the star after they buy it', async function() {
                await starInstance.putStarUpForSale(starId3, starPrice, {from: user2})
                assert.equal(await starInstance.ownerOf(starId3), user2)
                await starInstance.buyStar(starId3, {from: user1, value: starPrice})
                assert.equal(await starInstance.ownerOf(starId3), user1)
            })
        })
    })
})

var expectThrow = async function(promise) {
    try {
        await promise
    } catch (error) {
        assert.exists(error)
        return
    }

    assert.fail('expected an error, but none was found')
}