var StarNotary = artifacts.require("StarNotary");

module.exports = function(deployer, network) {
    console.log(network)
    deployer.deploy(StarNotary);
    console.log(deployer)
};