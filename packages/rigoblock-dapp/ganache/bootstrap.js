const Web3 = require('web3')
const c = require('chalk')
const { deploy } = require('rigoblock-protocol')
const logger = require('./logger')
const protocolSeed = require('./protocolSeed')
const { NETWORKS } = require('./constants')

const bootstrap = async network => {
  const web3 = new Web3(new Web3.providers.HttpProvider(network))
  const accList = await web3.eth.getAccounts()
  const networkId = await web3.eth.net.getId()
  logger.info('BASE ACCOUNT', c.bold.magenta(accList[0]))
  logger.info('NETWORK ID', c.bold.magenta(networkId))
  const contracts = await deploy(accList[0], network)
  await protocolSeed(accList, contracts)
}

NETWORKS.forEach(network =>
  bootstrap(network).catch(e => console.error('Error', e))
)
