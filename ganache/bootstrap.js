const Web3 = require('web3')
const c = require('chalk')
const logger = require('./logger')
const protocolDeploy = require('./protocolDeploy')
const { GANACHE_URL } = require('./constants')

const bootstrap = async () => {
  const web3 = new Web3(new Web3.providers.HttpProvider(GANACHE_URL))
  const accList = await web3.eth.getAccounts()
  const networkId = await web3.eth.net.getId()
  logger.info('BASE ACCOUNT', c.bold.magenta(accList[0]))
  logger.info('NETWORK ID', c.bold.magenta(networkId))
  await protocolDeploy(accList[0], networkId)
}

bootstrap().catch(e => console.error('Error', e))
