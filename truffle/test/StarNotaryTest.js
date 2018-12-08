const StarNotary = artifacts.require('StarNotary')

contract('StarNotary', accounts => {

    let user1 = accounts[1]
    let user2 = accounts[2]
    let randomMaliciousUser = accounts[3]

    let name = 'awesome star!'
    let starStory = "this star was bought for my wife's birthday"
    let ra = "1"
    let dec = "1"
    let mag = "1"
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
                let weiGasUsed = web3.toWei(actualGasUsed, "Gwei")

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