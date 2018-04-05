const path = require('path')
const Compiler = require('@0xproject/deployer').Compiler
const c = require('chalk')
const logger = require('./logger')

const compile = (contracts, networkId = 5777) => {
  const contractsSol = contracts.map(c => `${c}.sol`)
  const artifactsDir = path.resolve('artifacts')
  const contractsDir = path.resolve('contracts')
  console.log(artifactsDir)
  const compilerOpts = {
    artifactsDir,
    contractsDir,
    networkId,
    specifiedContracts: new Set(contractsSol)
  }

  const compiler = new Compiler(compilerOpts)

  logger.info(c.bold(`Compiling ${JSON.stringify(contracts)}...`))
  return compiler.compileAsync()
}

compile([
  'Authority',
  'DragoRegistry',
  'VaultEventful',
  'VaultFactory',
  'DragoEventful',
  'DragoFactory'
]).catch(e => console.error('Error', e))
