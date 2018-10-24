const path = require('path')
const Web3 = require('web3')
const Deployer = require('@rigoblock/deployer').Deployer
const c = require('chalk')
const { GAS_ESTIMATE } = require('../constants')
const logger = require('./logger')

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

  logger.info(c.bold(`Deploying ${contractName}...`))
  return deployer.deployAndSaveAsync(contractName, args)
}

module.exports = deploy
