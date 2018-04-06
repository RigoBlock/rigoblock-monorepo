const path = require('path')
const Web3 = require('web3')
const Compiler = require('@0xproject/deployer').Compiler
const c = require('chalk')
const globPromise = require('./glob-promise')
const logger = require('./logger')
const { NETWORKS } = require('./constants')

const artifactsDir = path.resolve('artifacts')
const contractsDir = path.resolve('contracts')

const compile = async (contracts, networkUrl) => {
  const web3 = new Web3(new Web3.providers.HttpProvider(networkUrl))
  const networkId = await web3.eth.net.getId()

  const compilerOpts = {
    artifactsDir,
    contractsDir,
    networkId,
    specifiedContracts: new Set(contracts)
  }

  const compiler = new Compiler(compilerOpts)

  logger.info(c.bold(`Compiling ${JSON.stringify(contracts)}...`))
  return compiler.compileAsync()
}

NETWORKS.forEach(network =>
  globPromise(contractsDir + '/**/!(*Face).sol').then(res =>
    compile(res, network)
  )
)
