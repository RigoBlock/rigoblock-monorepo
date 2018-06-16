const { NETWORKS } = require('../constants')
const Web3 = require('web3')
const deploy = require('@rigoblock/protocol/deploy')

beforeAll(async () => {
  const web3 = new Web3(new Web3.providers.HttpProvider(NETWORKS[0]))
  global.accounts = await web3.eth.getAccounts()
  const prevLog = console.log
  console.log = () => {}
  global.baseContracts = await deploy(accounts[0], NETWORKS[0])
  console.log = prevLog
})

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
