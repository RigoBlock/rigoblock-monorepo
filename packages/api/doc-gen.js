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
  if (false) {
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
  }

  const contractsMap = await fetchContracts(networkId)
  const docsList = await glob('./docs/**/*.md')

  await Promise.all(
    toPairs(contractsMap).map(async ([contractName, contractObj]) => {
      const lowCountractName = contractName.toLowerCase()
      const contractDoc = docsList.find(doc => doc.includes(lowCountractName))
      const { methods = {}, title = '' } = contractObj.devDoc
      let docContent = (await readFile(contractDoc)).toString()

      docContent = docContent.replace(
        /\n## +Index\n/,
        `\n${title}\n\n## Index\n`
      )

      docContent = await toPairs(methods).reduce(
        (prevPromise, [signature, methodObj]) => {
          prevPromise.then(docContent => {
            // Adding method description
            const methodName = signature.match(/(.+)\(/)[1]
            const methodRegexp = new RegExp(`\n### +${methodName}\n`)
            docContent = docContent.replace(
              methodRegexp,
              `\n${capitalize(methodObj.details)}\n\n###  ${methodName}\n`
            )

            // TODO fix this
            // Adding header to params table
            const paramsHeaderRegexp = new RegExp(
              `(### +${methodName}[\\s\\S]*\\| Name \\| Type \\|)([\\s\\S]*)###`,
              'm'
            )
            docContent = docContent.replace(
              paramsHeaderRegexp,
              `$1 Description |$2###`
            )

            console.log(docContent)
          })
        },
        Promise.resolve(docContent)
      )

      // await writeFile(contractDoc, docContent)
      console.log('contract')
      process.exit(0)
    })
  )
}
;(async () => {
  await docGen(process.env.NETWORK_ID || 5777)
  console.log(clk.green('Correctly filled documentation'))
})()
