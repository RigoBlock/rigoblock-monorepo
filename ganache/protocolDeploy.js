const Deployer = require('@0xproject/deployer').Deployer
const Compiler = require('@0xproject/deployer').Compiler
const c = require('chalk')
const logger = require('./logger')
const {
  ARTIFACTS_FOLDER,
  CONTRACTS_FOLDER,
  GANACHE_URL,
  GAS_ESTIMATE
} = require('./constants')

const compile = (networkId, contracts) => {
  const contractsSol = contracts.map(c => `${c}.sol`)

  const compilerOpts = {
    artifactsDir: ARTIFACTS_FOLDER,
    contractsDir: CONTRACTS_FOLDER,
    networkId,
    specifiedContracts: new Set(contractsSol)
  }

  const compiler = new Compiler(compilerOpts)

  logger.info('compiling...')
  return compiler.compileAllAsync()
}

const deploy = (from, networkId, contractName, args = []) => {
  const deployerOpts = {
    artifactsDir: ARTIFACTS_FOLDER,
    jsonrpcUrl: GANACHE_URL,
    networkId,
    defaults: {
      from,
      gas: GAS_ESTIMATE,
      gasPrice: 1
    }
  }

  const deployer = new Deployer(deployerOpts)

  logger.info(c.grey(`Deploying ${contractName}...`))
  return deployer.deployAndSaveAsync(contractName, args)
}

const printAddress = (name, address) => {
  return logger.info(c.grey(name), c.magenta(address))
}

module.exports = async (baseAccount, networkId) => {
  await compile(networkId, [
    'Authority',
    'DragoRegistry',
    'VaultEventful',
    'VaultFactory',
    'DragoEventful',
    'DragoFactory'
  ])
  const authority = await deploy(baseAccount, networkId, 'Authority')
  printAddress('Authority', authority.address)

  const registry = await deploy(baseAccount, networkId, 'DragoRegistry', [
    authority.address
  ])
  printAddress('DragoRegistry', authority.address)

  const vaultEventful = await deploy(baseAccount, networkId, 'VaultEventful', [
    authority.address
  ])
  printAddress('VaultEventful', authority.address)

  logger.info(c.grey('Setting up VaultEventful...'))
  authority.setVaultEventful(vaultEventful.address)

  const vaultFactory = await deploy(baseAccount, networkId, 'VaultFactory', [
    registry.address,
    baseAccount,
    authority.address
  ])
  printAddress('VaultFactory', authority.address)

  logger.info(c.grey('Whitelisting VaultFactory...'))
  authority.whitelistFactory(vaultFactory.address, true)

  const dragoEventful = await deploy(baseAccount, networkId, 'DragoEventful', [
    authority.address
  ])
  printAddress('DragoEventful', authority.address)

  logger.info(c.grey('Setting up DragoEventful...'))
  authority.setDragoEventful(dragoEventful.address)

  const dragoFactory = await deploy(baseAccount, networkId, 'DragoFactory', [
    registry.address,
    baseAccount,
    authority.address
  ])
  printAddress('DragoFactory', authority.address)

  logger.info(c.grey('Whitelisting DragoFactory...'))
  authority.whitelistFactory(dragoFactory.address, true)
}
