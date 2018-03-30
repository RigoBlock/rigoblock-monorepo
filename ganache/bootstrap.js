const Deployer = require('@0xproject/deployer').Deployer
const Compiler = require('@0xproject/deployer').Compiler
const Web3 = require('web3')
const path = require('path')
const fs = require('fs')

const ARTIFACTS_FOLDER = path.resolve('artifacts')
const CONTRACTS_FOLDER = path.resolve(
  '..',
  '..',
  'rigoblock-protocol',
  'contracts'
)
const GANACHE_URL = 'http://localhost:8545'
const GAS_ESTIMATE = 53000

const compile = (networkId, contracts) => {
  const contractsSol = contracts.map(c => `${c}.sol`)

  const compilerOpts = {
    artifactsDir: ARTIFACTS_FOLDER,
    contractsDir: CONTRACTS_FOLDER,
    networkId,
    specifiedContracts: new Set(contractsSol)
  }

  const compiler = new Compiler(compilerOpts)

  console.log('compiling...')
  return compiler.compileAllAsync()
}

const deploy = (from, networkId, contractName) => {
  const deployerOpts = {
    artifactsDir: ARTIFACTS_FOLDER,
    jsonrpcUrl: GANACHE_URL,
    networkId,
    defaults: {
      from,
      gas: GAS_ESTIMATE,
      gasPrice: 2e10
    }
  }

  const deployer = new Deployer(deployerOpts)

  console.log('deploying...')
  return deployer.deployAndSaveAsync(contractName)
}

const bootstrap = async () => {
  const web3 = new Web3(new Web3.providers.HttpProvider(GANACHE_URL))
  const accList = await web3.eth.getAccounts()
  const balance = await web3.eth.getBalance(accList[0])
  const networkId = await web3.eth.net.getId()
  console.log('accounts list', accList)
  console.log('balance', balance / 1e18)
  console.log('NETWORK ID', networkId)

  await compile(networkId, ['Authority'])
  const authority = await deploy(accList[0], networkId, 'Authority')

  await compile(networkId, ['Registry'])
  const registry = await deploy(accList[0], networkId, 'Registry')
  // const vaultFactoryAbi = require(path.resolve(
  //   ARTIFACTS_FOLDER,
  //   'VaultFactory.json'
  // ))

  // const vaultFactory = new web3.eth.Contract(
  //   vaultFactoryAbi.networks[networkId].abi,
  //   // '0xf25186b5081ff5ce73482ad761db0eb0d25abfbf'
  // )

  // // const result = await vaultFactory.methods
  // //   .createVault('wtf vault', 'WTF')
  // //   .call({ from: accList[0] })
  // const result = await vaultFactory.methods
  //   .getRegistry()
  //   .call({ from: accList[0] })

  // console.log('result', result)
}

bootstrap().catch(e => console.error('Error', e))
