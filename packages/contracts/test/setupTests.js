import { GANACHE_NETWORK_ID, GANACHE_PORT, NETWORKS } from '../constants'
import c from 'chalk'
import deploy from '@rigoblock/contracts/deploy'
import ganache from 'ganache-cli'
import logger from '../deploy/logger'
import pkg from '../package.json'
import web3 from './web3'

let server
process.on('warning', e => console.error(e.stack))
process.on('error', e => console.error(e.stack))

const setupGanache = async () => {
  const ganacheOptions = {
    mnemonic: pkg.config.mnemonic,
    port: GANACHE_PORT,
    network_id: GANACHE_NETWORK_ID
  }
  server = ganache.server(ganacheOptions)
  server.listen(
    GANACHE_PORT,
    err =>
      err ? logger.error(err) : logger.info(c.bold.green('Ganache starting!'))
  )
  const rawAccounts = await web3.eth.getAccounts()
  global.accounts = rawAccounts.map(acc => acc.toLowerCase())
  const prevLog = console.log
  console.log = () => {}
  global.baseContracts = await deploy(accounts[0], NETWORKS.localhost)
  console.log = prevLog
}

global.describeContract = (name, f) => {
  describe('', () => {
    beforeAll(setupGanache)
    describe(name, f)
    afterAll(async () => {
      const closeGanachePromise = new Promise((resolve, reject) => {
        server.close(
          err =>
            err
              ? reject(new Error(err))
              : resolve(logger.info(c.bold.yellow('Ganache stopping...')))
        )
      })
      return await closeGanachePromise
    })
  })
}

expect.extend({
  toBeHash(received) {
    try {
      if (received.substring(0, 2) === '0x' && received.length === 66) {
        return {
          message: () => `expected ${received} to be a valid Hash`,
          pass: true
        }
      }
    } catch (err) {}
    return {
      message: () => `expected ${received} to be a valid Hash`,
      pass: false
    }
  }
})
