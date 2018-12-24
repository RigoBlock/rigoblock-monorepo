const clk = require('chalk')
const fs = require('fs')
const { promisify } = require('util')
const fetchContracts = require('@rigoblock/contracts').default

const glob = promisify(require('glob'))
const exec = promisify(require('child_process').exec)

const unlink = promisify(fs.unlink)
const symlink = promisify(fs.symlink)
const copyFile = promisify(fs.copyFile)
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

function toPairs(obj) {
  return Object.keys(obj).map(key => [key, obj[key]])
}
function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const docGen = async networkId => {
  console.log('Renaming readme...')
  await unlink('./README.md')
  await copyFile('./README_BASE.md', './README.md')

  // TODO: do this call programmatically as soon
  // as there's a clear way for TypeDoc to be run from node
  try {
    console.log('Launching TypeDoc...')
    await exec(
      [
        'npx typedoc',
        `--theme markdown`,
        `--mdEngine github`,
        `--mdHideSources`,
        `--out docs src`
      ].join(' ')
    )
  } catch (error) {
    return console.error(error.stack)
  }

  console.log('Relinking readme...')
  await unlink('./README.md')
  await symlink('./docs/README.md', './README.md')

  const contractsMap = await fetchContracts(networkId)
  const docsList = await glob('./docs/**/*.md')

  console.log('Filling descriptions...')
  await Promise.all(
    toPairs(contractsMap).map(async ([contractName, contractObj]) => {
      console.log(`Filling ${clk.magenta(contractName)}...`)
      const lowCountractName = contractName.toLowerCase()
      const contractDoc = docsList.find(doc => doc.includes(lowCountractName))
      const { methods = {}, title = '' } = contractObj.devDoc
      let docContent = (await readFile(contractDoc)).toString()
      let tokenizedDoc = docContent.split('\n')

      const indexIx = tokenizedDoc.findIndex(tkn => tkn.match(/## +Index/))
      tokenizedDoc.splice(indexIx + 1, 0, '')
      tokenizedDoc.splice(indexIx + 2, 0, title)

      docContent = await toPairs(methods).reduce(
        (prevPromise, [signature, methodObj]) =>
          prevPromise.then(docContent => {
            // Adding method description
            tokenizedDoc = docContent.split('\n')
            const methodName = signature.match(/^[^\(]*/)[0]
            const methodIx = tokenizedDoc.findIndex(tkn =>
              tkn.match(new RegExp(`### +${methodName}`))
            )
            tokenizedDoc.splice(methodIx + 1, 0, '')
            tokenizedDoc.splice(methodIx + 2, 0, capitalize(methodObj.details))

            // Adding parameters description
            const nextMethodIx = tokenizedDoc.findIndex((tkn, ix) =>
              ix > methodIx + 2 ? tkn.match(/### +(.+)/) : false
            )
            let paramTableIx = tokenizedDoc.indexOf('| Name | Type |', methodIx)
            if (paramTableIx < nextMethodIx) {
              tokenizedDoc.splice(
                paramTableIx,
                1,
                '| Name | Type | Description |'
              )
              tokenizedDoc.splice(
                paramTableIx + 1,
                1,
                '| ------ | ------ | ------ |'
              )
              toPairs(methodObj.params || {}).forEach(
                ([paramName, paramDesc]) => {
                  const paramIx = tokenizedDoc.findIndex(tkn =>
                    tkn.match(new RegExp(`\\| ${paramName} \\|.+`))
                  )
                  if (paramIx < nextMethodIx) {
                    tokenizedDoc.splice(
                      paramIx,
                      1,
                      `${tokenizedDoc[paramIx]} ${paramDesc} |`
                    )
                  }
                }
              )
            }
            return tokenizedDoc.join('\n')
          }),
        Promise.resolve(docContent)
      )

      await writeFile(contractDoc, docContent)
    })
  )
}
;(async () => {
  await docGen(process.env.NETWORK_ID || 5777)
  console.log(clk.green('Correctly filled documentation'))
})()
