const path = require('path')
const fs = require('fs')
const Web3 = require('web3')
const { contracts } = require('@rigoblock/protocol')

const writeFilePromise = (name, content) =>
  new Promise((resolve, reject) =>
    fs.writeFile(name, content, err => (err ? reject(err) : resolve()))
  )

const extractor = async network => {
  const tmpFolder = path.join(__dirname, '..', '.tmp')
  if (!fs.existsSync(tmpFolder)) {
    fs.mkdirSync(tmpFolder)
  }
  const web3 = new Web3(new Web3.providers.HttpProvider(network))
  const networkId = await web3.eth.net.getId()
  const contractsMap = await contracts(networkId)
  const abiPromises = Object.keys(contractsMap).map(contractName =>
    writeFilePromise(
      path.join(__dirname, '..', '.tmp', `${contractName}.json`),
      JSON.stringify(contractsMap[contractName].abi, null, 2)
    )
  )
  return Promise.all(abiPromises)
}
;(async () => {
  await extractor('http://localhost:8545')
})()
