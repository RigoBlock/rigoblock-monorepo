const path = require('path')
const Compiler = require('@0xproject/deployer').Compiler
const c = require('chalk')
const globPromise = require('./glob-promise')
const logger = require('./logger')

const artifactsDir = path.resolve('artifacts')
const contractsDir = path.resolve('contracts')

const compile = (contracts, networkId = 5777) => {
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

globPromise(contractsDir + '/**/!(*Face).sol').then(res => compile(res))
