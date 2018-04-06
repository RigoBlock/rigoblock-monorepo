const Web3 = require('web3')
const c = require('chalk')
const { deploy } = require('@rigoblock/protocol')
const logger = require('./logger')

module.exports = async network => {
  const web3 = new Web3(new Web3.providers.HttpProvider(network))
  const accList = await web3.eth.getAccounts()
  logger.info('BASE ACCOUNT', c.bold.magenta(accList[0]))
  const contracts = await deploy(accList[0], network)
}
