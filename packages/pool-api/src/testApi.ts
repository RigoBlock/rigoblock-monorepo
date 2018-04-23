const Web3 = require('web3')
const { contracts } = require('@rigoblock/protocol')

const testPool = async network => {
  const web3 = new Web3(new Web3.providers.HttpProvider(network))
  const networkId = await web3.version.network
  const contractsMap = await contracts(networkId)
  const addresses = Object.keys(contractsMap).map(contractName => {
    contractName: contractsMap[contractName].address
  })
  //   .reduce((acc, curr) => Object.assign(acc, curr), {})
  // console.log(addresses)
}
;(async () => {
  await testPool('http://localhost:8545')
})()
