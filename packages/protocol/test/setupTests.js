const { NETWORKS } = require('../constants')
const Web3 = require('web3')
const deploy = require('@rigoblock/protocol/deploy')
const BigNumber = require('bignumber.js').BigNumber
const ganache = require('ganache-cli')
const mnemonic = require('../package.json').config.mnemonic
const logger = require('../deploy/logger')
const c = require('chalk')

let server
process.on('warning', e => console.error(e.stack))
process.on('error', e => console.error(e.stack))

const setupGanache = async () => {
  const port = 8545
  const network_id = 5777
  const ganacheOptions = { mnemonic, port, network_id }
  server = ganache.server(ganacheOptions)
  server.listen(port, err => {
    if (err) {
      console.err(err)
    }
    logger.info(c.bold.green('Ganache starting!'))
  })
  global.web3 = new Web3(new Web3.providers.HttpProvider(NETWORKS[0]))
  global.networkId = 5777
  const rawAccounts = await web3.eth.getAccounts()
  global.accounts = rawAccounts.map(acc => acc.toLowerCase())
  const prevLog = console.log
  console.log = () => {}
  global.baseContracts = await deploy(accounts[0], NETWORKS[0])
  console.log = prevLog
}

global.toBigNumber = val => new BigNumber(val)
global.fromWei = val => val / 1e18
global.fromMicro = val => val / 1e6
global.describeContract = (name, f) => {
  describe('', async () => {
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
      if (received.substr(0, 2) === '0x' && received.length === 66) {
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
