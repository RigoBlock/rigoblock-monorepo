const inquirer = require('inquirer')
const { NETWORKS } = require('../constants')
const logger = require('./logger')
const c = require('chalk')
const deploy = require('./deploy')

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
      filter: input => input.split(',').map(el => el.trim()),
      default: []
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
}

script()
