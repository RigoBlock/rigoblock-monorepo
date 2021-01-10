import { Web3 } from 'web3'
import { bootstrap } from '@rgbk/contracts/deploy/bootstrap'
import { c } from 'chalk'
import { logger } from './logger'

const task = async network => {
  const web3 = new Web3(new Web3.providers.HttpProvider(network))
  const accList = await web3.eth.getAccounts()
  logger.info('BASE ACCOUNT', c.bold.magenta(accList[0]))
  await bootstrap(accList[0], network)
}

export default task
