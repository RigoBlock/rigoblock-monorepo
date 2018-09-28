import Web3 = require('web3')

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

const getData = async () => {
  const network = await web3.eth.net.getId()

  console.log('HERE I AM', network)
}

getData()
