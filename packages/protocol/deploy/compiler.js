const Web3 = require('web3')
const Compiler = require('@0xproject/deployer').Compiler
const c = require('chalk')
const {
  NETWORKS,
  ARTIFACTS_DIR,
  CONTRACTS_DIR,
  CONTRACT_NAMES
} = require('../constants')
const logger = require('./logger')

const compile = async (contracts, networkUrl) => {
  const web3 = new Web3(new Web3.providers.HttpProvider(networkUrl))
  const networkId = await web3.eth.net.getId()

  const compilerOpts = {
    artifactsDir: ARTIFACTS_DIR,
    contractsDir: CONTRACTS_DIR,
    networkId,
    specifiedContracts: new Set(contracts)
  }

  const compiler = new Compiler(compilerOpts)

  logger.info(c.bold(`Compiling ${JSON.stringify(contracts)}...`))
  return compiler.compileAsync()
}

const compilePromises = NETWORKS.map(network => {
  const artifacts = CONTRACT_NAMES.map(contractName => `${contractName}.sol`)
  return compile(artifacts, network)
})

Promise.all(compilePromises).catch(e => {
  logger.error(c.red(`Error during compilation: ${e.stack}`))
  process.exit(1)
})
