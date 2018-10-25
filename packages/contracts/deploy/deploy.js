const path = require('path')
const Web3 = require('web3')
const Deployer = require('@rigoblock/deployer').Deployer
const { GAS_ESTIMATE } = require('../constants')

const deploy = async (
  from,
  networkUrl,
  contractName,
  args = [],
  verbose = true,
  web3
) => {
  if (!web3) {
    web3 = new Web3(new Web3.providers.HttpProvider(networkUrl))
  }
  console.log(networkUrl)
  const networkId = await web3.eth.net.getId()
  console.log(networkId)
  const deployerOpts = {
    artifactsDir: path.resolve(__dirname, '..', 'artifacts'),
    jsonrpcUrl: networkUrl,
    verbose,
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
