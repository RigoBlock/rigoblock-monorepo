const { NETWORKS } = require('../constants')
const c = require('chalk')
const deploy = require('./deploy')
const inquirer = require('inquirer')
const logger = require('./logger')
const Web3 = require('web3')
const pkg = require('../package.json')
const HDWalletProvider = require('truffle-hdwallet-provider')

const script = async () => {
  let selectedNetwork
  const { network } = await inquirer.prompt([
    {
      type: 'list',
      name: 'network',
      message: 'Select the network.',
      choices: ['mainnet', 'ropsten', 'kovan', 'ganache', 'custom']
    }
  ])
  selectedNetwork = NETWORKS[network]
  if (network === 'custom') {
    const { customUrl } = await inquirer.prompt([
      {
        type: 'input',
        name: 'customUrl',
        message: 'Insert your custom RPC url.'
      }
    ])
    selectedNetwork = customUrl
  }
  const { account } = await inquirer.prompt([
    {
      type: 'input',
      name: 'account',
      message: 'Insert the account you wish to deploy with.'
    }
  ])
  const { contractName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'contractName',
      message: 'Insert the name of the contract.'
    }
  ])
  let { contractArgs } = await inquirer.prompt([
    {
      type: 'input',
      name: 'contractArgs',
      message:
        'Insert any required arguments for the contract, comma separated.',
      filter: input => (input ? input.split(',').map(el => el.trim()) : [])
    }
  ])
  if (selectedNetwork === NETWORKS.ganache) {
    try {
      await deploy(account, selectedNetwork, contractName, contractArgs)
    } catch (e) {
      logger.error(c.red(`Error: ${e.message}`))
    }
    return
  }
  const { privateKey } = await inquirer.prompt([
    {
      type: 'password',
      name: 'privateKey',
      mask: '*',
      message: 'Insert the mnemonic for the account.'
    }
  ])
  let provider = new HDWalletProvider(privateKey, selectedNetwork)
  const web3 = new Web3(provider)
  const accounts = await web3.eth.getAccounts()
  console.log(accounts)
  try {
    await deploy(account, selectedNetwork, contractName, contractArgs, web3)
  } catch (e) {
    logger.error(c.red(`Error: ${e.message}`))
  }
  return provider.engine.stop()
}

script()
