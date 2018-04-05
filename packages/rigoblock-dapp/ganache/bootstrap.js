const Web3 = require('web3')
const c = require('chalk')
const { deploy } = require('rigoblock-protocol')
const logger = require('./logger')
const protocolSeed = require('./protocolSeed')

const GANACHE_URL = 'http://localhost:8545'

const bootstrap = async () => {
  const web3 = new Web3(new Web3.providers.HttpProvider(GANACHE_URL))
  const accList = await web3.eth.getAccounts()
  const networkId = await web3.eth.net.getId()
  logger.info('BASE ACCOUNT', c.bold.magenta(accList[0]))
  logger.info('NETWORK ID', c.bold.magenta(networkId))
  const contracts = await deploy(accList[0], networkId)
  await protocolSeed(accList, contracts)
}

bootstrap().catch(e => console.error('Error', e))
