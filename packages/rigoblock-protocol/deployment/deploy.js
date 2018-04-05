const path = require('path')
const Deployer = require('@0xproject/deployer').Deployer
const c = require('chalk')
const logger = require('./logger')
const { GANACHE_URL, GAS_ESTIMATE } = require('./constants')

const deploy = (from, networkId, contractName, args = []) => {
  const deployerOpts = {
    artifactsDir: path.resolve('..', '..', 'rigoblock-protocol', 'artifacts'),
    jsonrpcUrl: GANACHE_URL,
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

module.exports = async (baseAccount, networkId) => {
  const authority = await deploy(baseAccount, networkId, 'Authority')
  printAddress('Authority', authority.address)

  const dragoRegistry = await deploy(baseAccount, networkId, 'DragoRegistry', [
    authority.address
  ])
  printAddress('DragoRegistry', dragoRegistry.address)

  const vaultEventful = await deploy(baseAccount, networkId, 'VaultEventful', [
    authority.address
  ])
  printAddress('VaultEventful', vaultEventful.address)

  logger.info(c.bold('Setting up VaultEventful...'))
  authority.setVaultEventful(vaultEventful.address)

  const vaultFactory = await deploy(baseAccount, networkId, 'VaultFactory', [
    dragoRegistry.address,
    baseAccount,
    authority.address
  ])
  printAddress('VaultFactory', vaultFactory.address)

  logger.info(c.bold('Whitelisting VaultFactory...'))
  authority.whitelistFactory(vaultFactory.address, true)

  const dragoEventful = await deploy(baseAccount, networkId, 'DragoEventful', [
    authority.address
  ])
  printAddress('DragoEventful', dragoEventful.address)

  logger.info(c.bold('Setting up DragoEventful...'))
  authority.setDragoEventful(dragoEventful.address)

  const dragoFactory = await deploy(baseAccount, networkId, 'DragoFactory', [
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
