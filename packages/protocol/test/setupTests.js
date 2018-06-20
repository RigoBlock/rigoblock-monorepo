const { NETWORKS } = require('../constants')
const Web3 = require('web3')
const deploy = require('@rigoblock/protocol/deploy')
const BigNumber = require('bignumber.js').BigNumber
const ganache = require('ganache-cli')
const mnemonic = require('../package.json').config.mnemonic

let server

const be = async () => {
  const port = 8545
  const network_id = 5777
  const ganacheOptions = { mnemonic, port, network_id }
  server = ganache.server(ganacheOptions)
  server.listen(port, err => {
    if (err) {
      console.err(err)
    }
    console.log('Ganache started!')
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
global.describeContracts = (name, f) => {
  describe('', async () => {
    beforeAll(be)
    describe(name, f)
    afterAll(async () => {
      const closePromise = new Promise((resolve, reject) => {
        server.close(
          err =>
            err
              ? reject(new Error(err))
              : resolve(console.log('server stopping'))
        )
      })
      return await closePromise
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
