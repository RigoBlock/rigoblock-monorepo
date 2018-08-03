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
  await authority.setVaultEventful(vaultEventful.address)

  const vaultFactory = await deploy(baseAccount, network, 'VaultFactory', [
    dragoRegistry.address,
    baseAccount,
    authority.address
  ])
  printAddress('VaultFactory', vaultFactory.address)

  logger.info(c.bold('Whitelisting VaultFactory...'))
  await authority.whitelistFactory(vaultFactory.address, true)

  const dragoEventful = await deploy(baseAccount, network, 'DragoEventful', [
    authority.address
  ])
  printAddress('DragoEventful', dragoEventful.address)

  logger.info(c.bold('Setting up DragoEventful...'))
  await authority.setDragoEventful(dragoEventful.address)

  const dragoFactory = await deploy(baseAccount, network, 'DragoFactory', [
    dragoRegistry.address,
    baseAccount,
    authority.address
  ])
  printAddress('DragoFactory', dragoFactory.address)

  logger.info(c.bold('Whitelisting DragoFactory...'))
  await authority.whitelistFactory(dragoFactory.address, true)

  const rigoToken = await deploy(baseAccount, network, 'RigoToken', [
    baseAccount,
    baseAccount
  ])
  printAddress('RigoToken', rigoToken.address)

  const proofOfPerformance = await deploy(
    baseAccount,
    network,
    'ProofOfPerformance',
    [rigoToken.address, baseAccount, dragoRegistry.address]
  )
  printAddress('ProofOfPerformance', proofOfPerformance.address)

  const inflation = await deploy(baseAccount, network, 'Inflation', [
    rigoToken.address,
    proofOfPerformance.address,
    authority.address
  ])
  printAddress('Inflation', inflation.address)

  await rigoToken.changeMintingAddress(inflation.address)
  printAddress('Setting minting address...', inflation.address)

  const tokenTransferProxy = await deploy(
    baseAccount,
    network,
    'TokenTransferProxy'
  )
  printAddress('TokenTransferProxy', tokenTransferProxy.address)

  const wrapperLockEth = await deploy(
    baseAccount,
    network,
    'WrapperLockEth',
    ['ETHWrapper', 'ETHW', 18, tokenTransferProxy.address]
  )
  printAddress('WrapperLockEth', wrapperLockEth.address)

  return {
    Authority: authority,
    DragoRegistry: dragoRegistry,
    VaultEventful: vaultEventful,
    VaultFactory: vaultFactory,
    DragoEventful: dragoEventful,
    DragoFactory: dragoFactory,
    RigoToken: rigoToken,
    ProofOfPerformance: proofOfPerformance,
    Inflation: inflation,
    TokenTransferProxy: tokenTransferProxy,
    WrapperLockEth: wrapperLockEth
  }
}
