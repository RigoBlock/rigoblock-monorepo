const { NETWORKS } = require('../constants')
const c = require('chalk')
const deploy = require('./deploy')
const figures = require('figures')
const inquirer = require('inquirer')
const logger = require('./logger')
const Multispinner = require('multispinner')

const script = async () => {
  let selectedNetwork
  const message = 'Deploying...'
  const opts = {
    autoStart: false,
    symbol: {
      success: figures.tick,
      error: figures.cross
    }
  }
  const multispinner = new Multispinner([message], opts)
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
    multispinner.start()
    try {
      await deploy(account, selectedNetwork, contractName, contractArgs).then(
        () => multispinner.success(message)
      )
    } catch (e) {
      multispinner.error(message)
      logger.error(c.red(`Error: ${e.message}`))
    }
    return
  }
}

script()
