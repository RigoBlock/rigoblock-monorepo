const { NETWORKS } = require('../constants')
const c = require('chalk')
const deploy = require('./deploy')
const HDWalletProvider = require('truffle-hdwallet-provider')
const inquirer = require('inquirer')
const Web3 = require('web3')
const logger = require('./logger')
const Multispinner = require('multispinner')

const cli = async () => {
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
        message: 'Insert your custom RPC url.',
        filter: input => normalize(input)
      }
    ])
    selectedNetwork = customUrl
  }
  const { account } = await inquirer.prompt([
    {
      type: 'input',
      name: 'account',
      message: 'Insert the account you wish to deploy with.',
      validate: input =>
        Web3.utils.isAddress(normalize(input))
          ? true
          : c.red('Please insert a valid account.'),
      filter: input => normalize(input)
    }
  ])
  const { contractName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'contractName',
      message: 'Insert the name of the contract.',
      filter: input => normalize(input)
    }
  ])
  let { contractArgs } = await inquirer.prompt([
    {
      type: 'input',
      name: 'contractArgs',
      message:
        'Insert any required arguments for the contract, comma separated.',
      filter: input => (input ? input.split(',').map(el => normalize(el)) : [])
    }
  ])
  if (selectedNetwork === NETWORKS.ganache) {
    return withSpinner(
      deploy(account, selectedNetwork, contractName, contractArgs, false)
    )
  }
  const { privateKey } = await inquirer.prompt([
    {
      type: 'password',
      name: 'privateKey',
      mask: '*',
      message: 'Insert the private key of the account.',
      filter: input => normalize(input)
    }
  ])
  let provider = new HDWalletProvider(privateKey, selectedNetwork)
  await withSpinner(
    deploy(
      account,
      selectedNetwork,
      contractName,
      contractArgs,
      false,
      provider
    )
  )
  return provider.engine.stop()
}

const withSpinner = async promise => {
  const message = 'Deploying contract...'
  const multispinner = new Multispinner([message])
  try {
    await promise.then(res => {
      multispinner.success(message)
      multispinner.on('done', () => {
        logger.info(
          c.green(`transactionHash:`),
          c.bold(c.white(res._contract.transactionHash))
        )
        logger.info(
          c.green(`Contract successfully deployed at`),
          c.bold(c.white(res.address))
        )
      })
    })
  } catch (e) {
    multispinner.error(message)
    multispinner.on('done', () => {
      logger.error(c.red(`Error: ${e.message}`))
    })
  }
}

const normalize = str => str.trim().toLowerCase()

cli()
