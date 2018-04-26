const path = require('path')
const Web3 = require('web3')
const Deployer = require('@0xproject/deployer').Deployer
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

const printAddress = (name, address) => {
  return logger.info(c.bold(name), c.bold.magenta(address))
}

module.exports = async (baseAccount, network) => {
  const authority = await deploy(baseAccount, network, 'Authority')
  printAddress('Authority', authority.address)

  const dragoRegistry = await deploy(baseAccount, network, 'DragoRegistry', [
    authority.address
  ])
  printAddress('DragoRegistry', dragoRegistry.address)

  const vaultEventful = await deploy(baseAccount, network, 'VaultEventful', [
    authority.address
  ])
  printAddress('VaultEventful', vaultEventful.address)

  logger.info(c.bold('Setting up VaultEventful...'))
  authority.setVaultEventful(vaultEventful.address)

  const vaultFactory = await deploy(baseAccount, network, 'VaultFactory', [
    dragoRegistry.address,
    baseAccount,
    authority.address
  ])
  printAddress('VaultFactory', vaultFactory.address)

  logger.info(c.bold('Whitelisting VaultFactory...'))
  authority.whitelistFactory(vaultFactory.address, true)

  const dragoEventful = await deploy(baseAccount, network, 'DragoEventful', [
    authority.address
  ])
  printAddress('DragoEventful', dragoEventful.address)

  logger.info(c.bold('Setting up DragoEventful...'))
  authority.setDragoEventful(dragoEventful.address)

  const dragoFactory = await deploy(baseAccount, network, 'DragoFactory', [
    dragoRegistry.address,
    baseAccount,
    authority.address
  ])
  printAddress('DragoFactory', dragoFactory.address)

  logger.info(c.bold('Whitelisting DragoFactory...'))
  authority.whitelistFactory(dragoFactory.address, true)

  return {
    authority,
    dragoRegistry,
    vaultEventful,
    vaultFactory,
    dragoEventful,
    dragoFactory
  }
}
