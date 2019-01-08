const path = require('path')
const clk = require('chalk')
const fs = require('fs')
const toPascalCase = require('to-pascal-case')
const Handlebars = require('./handlebars')

const contractsListGenerator = async () => {
  const contractsFolder = path.join(__dirname, 'src/contracts/models')
  const contractsListTemplate = fs.readFileSync(
    path.join(__dirname, 'templates', 'contracts-list.handlebars')
  )

  const contractsList = Handlebars.compile(contractsListTemplate.toString())

  const contracts = fs
    .readdirSync(contractsFolder)
    .map(filePath => {
      const match = filePath.match(/(.+)(\..+)/i)
      const fileName = match ? match[1] : filePath
      let key = toPascalCase(fileName)

      // Exceptions
      if (['erc20', 'weth9'].indexOf(fileName) > -1) {
        key = fileName.toUpperCase()
      }

      return { [key]: fileName }
    })
    .reduce((acc, val) => ({ ...acc, ...val }), {})

  const compiled = contractsList({ contracts })
  fs.writeFileSync(
    path.join(contractsFolder, '..', 'contractsList.ts'),
    compiled
  )
}
;(async () => {
  await contractsListGenerator()
  console.log(clk.green('Correctly generated contracts list'))
})()
