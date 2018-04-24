// const path = require('path')
const { CONTRACT_NAMES } = require('./constants')

export default async networkId => {
  const artifacts = CONTRACT_NAMES.map(contractName => `${contractName}.json`)
  const abisMap = artifacts.map(async artifact => {
    const json = await import('../artifacts/' + artifact)
    return {
      [artifact
        .split('/')
        .pop()
        .replace('.json', '')]: {
        abi: json['networks'][networkId].abi,
        address: json['networks'][networkId].address
      }
    }
  })

  return Promise.all(abisMap)
}

// module.exports = networkId =>
//   new Promise((resolve, reject) => {
//     globPromise(ARTIFACTS_DIR + '/**/*.json')
//       .then(artifacts => {
//         const abisMap = artifacts
//           .map(artifact => {
//             return {
//               [artifact
//                 .split('/')
//                 .pop()
//                 .replace('.json', '')]: {
//                 abi: require(artifact)['networks'][networkId].abi,
//                 address: require(artifact)['networks'][networkId].address
//               }
//             }
//           })
//           .reduce((acc, curr) => Object.assign(acc, curr), {})
//         resolve(abisMap)
//       })
//       .catch(reject)
//   })
