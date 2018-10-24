const inquirer = require('inquirer')
const { NETWORKS } = require('../constants')
const logger = require('./logger')
const c = require('chalk')
const deploy = require('./deploy')

const script = async () => {
  const { contractName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'contractName',
      message: 'Insert the name of the contract that needs to be deployed.'
    }
  ])
  let { network } = await inquirer.prompt([
    {
      type: 'input',
      name: 'network',
      message:
        'Select the network to deploy to (mainnet, ropsten, kovan, localhost).'
    }
  ])
  network = network.trim().toLowerCase()
  if (!NETWORKS[network]) {
    return logger.error(c.red('Please enter a valid network.'))
  }
  const selectedNetwork = NETWORKS[network]
  const { account } = await inquirer.prompt([
    {
      type: 'input',
      name: 'account',
      message: 'Insert the account you wish to deploy with.'
    }
  ])
  let { contractArgs } = await inquirer.prompt([
    {
      type: 'input',
      name: 'contractArgs',
      message: 'Insert any required arguments for the contract.'
    }
  ])
  contractArgs = contractArgs || []
  if (selectedNetwork === NETWORKS.localhost) {
    try {
      await deploy(account, selectedNetwork, contractName, contractArgs)
    } catch (e) {
      logger.error(c.red(`Error: ${e.message}`))
    }
    return
  }
}

script()
