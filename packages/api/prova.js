const Web3 = require('web3')
const Api = require('./dist/api').default

const ads = async () => {
  const web3 = new Web3(
    new Web3.providers.WebsocketProvider('wss://ropsten.infura.io/ws/')
  )
  const api = new Api()
  await api.init(web3)

  const authority = await api.contract.Authority.createAndValidate(
    api.web3,
    api.contract.Authority.address
  )
  console.log(authority)
}

ads()
