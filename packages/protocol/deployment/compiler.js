const Web3 = require('web3')
const Compiler = require('@0xproject/deployer').Compiler
const c = require('chalk')
const globPromise = require('./glob-promise')
const logger = require('./logger')
const { NETWORKS, ARTIFACTS_DIR, CONTRACTS_DIR } = require('./constants')

const compile = async (contracts, networkUrl) => {
  const web3 = new Web3(new Web3.providers.HttpProvider(networkUrl))
  const networkId = await web3.eth.net.getId()

  const compilerOpts = {
    ARTIFACTS_DIR,
    CONTRACTS_DIR,
    networkId,
    specifiedContracts: new Set(contracts)
  }

  const compiler = new Compiler(compilerOpts)

  logger.info(c.bold(`Compiling ${JSON.stringify(contracts)}...`))
  return compiler.compileAsync()
}

NETWORKS.forEach(network =>
  globPromise(CONTRACTS_DIR + '/**/!(*Face).sol').then(artifacts => {
    artifacts = artifacts.map(file => file.split('/').pop())
    return compile(artifacts, network)
  })
)
