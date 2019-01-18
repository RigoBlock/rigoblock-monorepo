const clk = require('chalk')
const { promisify } = require('util')
const fetchContracts = require('@rigoblock/contracts').default
const fs = require('fs-extra')

const glob = promisify(require('glob'))
const exec = promisify(require('child_process').exec)

function toPairs(obj) {
  return Object.keys(obj).map(key => [key, obj[key]])
}
function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const docGen = async networkId => {
  await fs.ensureDir('./docs/guides')
  await fs.move('./docs/guides', './guides')
  await fs.emptyDir('./docs')

  // TODO: do this call programmatically as soon
  // as there's a clear way for TypeDoc to be run from node
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
  await fs.move('./guides', './docs/guides')

  const README_PATH = './docs/README.md'
  let readmeContent = (await fs.readFile(README_PATH)).toString()
  readmeContent = readmeContent.replace(/(\.\/docs\/)/g, './')
  await fs.writeFile(README_PATH, readmeContent)

  const contractsMap = await fetchContracts(networkId)
  const docsList = await glob('./docs/**/*.md')

  console.log('Filling descriptions...')
  await Promise.all(
    toPairs(contractsMap).map(async ([contractName, contractObj]) => {
      console.log(`Filling ${clk.magenta(contractName)}...`)
      const lowContractName = contractName.toLowerCase()
      const contractDoc = docsList.find(doc => doc.includes(lowContractName))
      const { methods = {}, title = '' } = contractObj.devDoc
      let docContent = (await fs.readFile(contractDoc)).toString()
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

              // Adding return description
              let returnIx = tokenizedDoc.findIndex(tkn =>
                tkn.match(new RegExp(`\\*\\*Returns.+`))
              )
              if (returnIx < nextMethodIx && methodObj.return) {
                tokenizedDoc.splice(
                  returnIx,
                  1,
                  `${tokenizedDoc[returnIx]} ${methodObj.return}`
                )
              }
            }
            return tokenizedDoc.join('\n')
          }),
        Promise.resolve(docContent)
      )

      await fs.writeFile(contractDoc, docContent)
    })
  )
}
;(async () => {
  try {
    await docGen(process.env.NETWORK_ID || 5777)
    console.log(clk.green('Correctly filled documentation'))
  } catch (e) {
    console.log(clk.red('Doc generation failed.'))
    console.error(e.stack)
  }
})()
