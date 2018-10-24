const inquirer = require('inquirer')
const { NETWORKS } = require('../constants')
const deploy = require('./index.js')
const Web3 = require('web3')
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
      await deploy(account, selectedNetwork)
    } catch (e) {
      logger.error(c.red(`Error: ${e.message}`))
    }
    return
  }
  const { password } = await inquirer.prompt([
    {
      type: 'password',
      name: 'password',
      message: 'Insert the account password'
    }
  ])
  const web3 = new Web3(new Web3.providers.HttpProvider(selectedNetwork))
  try {
    await web3.eth.personal.unlockAccount(account, password, 180)
    await deploy(account, selectedNetwork)
  } catch (e) {
    logger.error(c.red(`Error: ${e.message}`))
  }
  return
}

script()
