const bootstrap = require('@rgbk/contracts/deploy/bootstrap')
const Web3 = require('web3')

const bootstrapContracts = async () => {
  const GANACHE_URL = 'http://localhost:8545'
  const web3 = new Web3(new Web3.providers.HttpProvider(GANACHE_URL))
  const accounts = await web3.eth.getAccounts()

  await bootstrap(accounts[0], GANACHE_URL)
}

bootstrapContracts()
