const globPromise = require('./glob-promise')
const { ARTIFACTS_DIR } = require('./constants')

module.exports = networkId =>
  new Promise((resolve, reject) => {
    globPromise(ARTIFACTS_DIR + '/**/*.json')
      .then(artifacts => {
        const abisMap = artifacts
          .map(artifact => {
            return {
              [artifact
                .split('/')
                .pop()
                .replace('.json', '')]: {
                abi: require(artifact)['networks'][networkId].abi,
                address: require(artifact)['networks'][networkId].address
              }
            }
          })
          .reduce((acc, curr) => Object.assign(acc, curr), {})

        resolve(abisMap)
      })
      .catch(reject)
  })
