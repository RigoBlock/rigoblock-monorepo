const path = require('path')
const clk = require('chalk')
const fs = require('fs')
const Web3 = require('web3')
const protocol = require('@rigoblock/protocol').default

const writeFilePromise = (name, content) =>
  new Promise((resolve, reject) =>
    fs.writeFile(name, content, err => (err ? reject(err) : resolve()))
  )

const extractor = async network => {
  const tmpFolder = path.join(__dirname, '..', '.tmp/')
  if (!fs.existsSync(tmpFolder)) {
    fs.mkdirSync(tmpFolder)
  }
  const web3 = new Web3(new Web3.providers.HttpProvider(network))
  const networkId = await web3.version.network
  const contractsMap = await protocol(networkId)
  const abiPromises = Object.keys(contractsMap).map(contractName => {
    console.log(`Extracting ${clk.magenta(contractName)}`)
    return writeFilePromise(
      path.join(tmpFolder, `${contractName}.json`),
      JSON.stringify(contractsMap[contractName].abi, null, 2)
    )
  })
  return Promise.all(abiPromises)
}
;(async () => {
  await extractor('http://localhost:8545')
  console.log(clk.green('Correctly extracted all files'))
})()
