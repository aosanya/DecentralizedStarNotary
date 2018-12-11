var StarNotary = artifacts.require("StarNotary2");

module.exports = function(deployer, network) {
    console.log(network)
    deployer.deploy(StarNotary);
};