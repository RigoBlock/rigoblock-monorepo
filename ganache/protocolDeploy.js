const Deployer = require('@0xproject/deployer').Deployer
const Compiler = require('@0xproject/deployer').Compiler
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

  logger.info('deploying...')
  return deployer.deployAndSaveAsync(contractName, args)
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

  const registry = await deploy(baseAccount, networkId, 'DragoRegistry', [
    authority.address
  ])

  const vaultEventful = await deploy(baseAccount, networkId, 'VaultEventful', [
    authority.address
  ])

  authority.setVaultEventful(vaultEventful.address)

  const vaultFactory = await deploy(baseAccount, networkId, 'VaultFactory', [
    registry.address,
    baseAccount,
    authority.address
  ])

  authority.whitelistFactory(vaultFactory.address, true)

  const dragoEventful = await deploy(baseAccount, networkId, 'DragoEventful', [
    authority.address
  ])

  authority.setVaultEventful(dragoEventful.address)

  const dragoFactory = await deploy(baseAccount, networkId, 'DragoFactory', [
    registry.address,
    baseAccount,
    authority.address
  ])

  authority.whitelistFactory(dragoFactory.address, true)
}
