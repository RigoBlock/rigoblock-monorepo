const inquirer = require('inquirer')
const { NETWORKS } = require('../constants')
const bootstrap = require('./index.js')
const logger = require('./logger')
const c = require('chalk')

const script = async () => {
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
  if (selectedNetwork === NETWORKS.localhost) {
    try {
      await bootstrap(account, selectedNetwork)
    } catch (e) {
      logger.error(c.red(`Error: ${e.message}`))
    }
    return
  }
}

script()
