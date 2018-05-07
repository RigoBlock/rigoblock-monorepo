const path = require('path')
const clk = require('chalk')
const fs = require('fs')
const protocol = require('@rigoblock/protocol').default

const writeFilePromise = (name, content) =>
  new Promise((resolve, reject) =>
    fs.writeFile(name, content, err => (err ? reject(err) : resolve()))
  )

const extractor = async networkId => {
  const tmpFolder = path.join(__dirname, '..', '.tmp/')
  if (!fs.existsSync(tmpFolder)) {
    fs.mkdirSync(tmpFolder)
  }
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
  await extractor(process.env.NETWORK_ID || 5777)
  console.log(clk.green('Correctly extracted all files'))
})()
