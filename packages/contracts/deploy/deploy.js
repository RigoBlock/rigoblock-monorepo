const path = require('path')
const Web3 = require('web3')
const Deployer = require('@rigoblock/deployer').Deployer
const { GAS_ESTIMATE } = require('../constants')

const deploy = async (from, networkUrl, contractName, args = []) => {
  const web3 = new Web3(new Web3.providers.HttpProvider(networkUrl))
  const networkId = await web3.eth.net.getId()
  const deployerOpts = {
    artifactsDir: path.resolve(__dirname, '..', 'artifacts'),
    jsonrpcUrl: networkUrl,
    networkId,
    defaults: {
      from,
      gas: GAS_ESTIMATE,
      gasPrice: 1
    }
  }
  const deployer = new Deployer(deployerOpts)

  return deployer.deployAndSaveAsync(contractName, args)
}

module.exports = deploy
