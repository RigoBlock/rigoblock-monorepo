const Web3 = require('web3')
const Compiler = require('@rgbk/deployer').Compiler
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
    specifiedContracts: new Set(contracts),
    optimizerEnabled: true,
    optimizerRuns: 1000000
  }

  const compiler = new Compiler(compilerOpts)

  return compiler.compileAsync()
}

logger.info(c.bold(`Compiling ${JSON.stringify(CONTRACT_NAMES)}...`))
const compilePromise = Object.values(NETWORKS).reduce(
  (acc, network) => acc.then(() => compile(CONTRACT_NAMES, network)),
  Promise.resolve()
)

compilePromise.catch(e => {
  logger.error(c.red(`Error during compilation: ${e.stack}`))
  process.exit(1)
})
