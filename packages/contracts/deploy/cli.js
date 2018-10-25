const { NETWORKS } = require('../constants')
const c = require('chalk')
const deploy = require('./deploy')
const Web3 = require('web3')
const HDWalletProvider = require('truffle-hdwallet-provider')
const figures = require('figures')
const inquirer = require('inquirer')
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
    return withSpinner(
      deploy(account, selectedNetwork, contractName, contractArgs, false)
    )
  }
  // const { privateKey } = await inquirer.prompt([
  //   {
  //     type: 'password',
  //     name: 'privateKey',
  //     mask: '*',
  //     message: 'Insert the mnemonic for the account.'
  //   }
  // ])
  // let provider = new HDWalletProvider(privateKey, selectedNetwork)
  // const web3 = new Web3(provider)
  // const accounts = await web3.eth.getAccounts()
  // try {
  //   await deploy(account, selectedNetwork, contractName, contractArgs, web3)
  // } catch (e) {
  //   logger.error(c.red(`Error: ${e.message}`))
  // }
  // return provider.engine.stop()
}

const withSpinner = async promise => {
  const message = 'Deploying contract...'
  const opts = {
    symbol: {
      success: figures.tick,
      error: figures.cross
    }
  }
  const multispinner = new Multispinner([message], opts)
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
    logger.error(c.red(`Error: ${e.message}`))
  }
}

cli()
