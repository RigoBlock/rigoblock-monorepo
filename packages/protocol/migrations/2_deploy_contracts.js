const VaultFactoryLibrary = artifacts.require(
  './VaultFactory/VaultFactoryLibrary/VaultFactoryLibrary.sol'
)
const VaultFactory = artifacts.require('./VaultFactory/VaultFactory.sol')

module.exports = function(deployer) {
  deployer.deploy(VaultFactoryLibrary)
  deployer.link(VaultFactoryLibrary, VaultFactory)
  deployer.deploy(VaultFactory)
}
