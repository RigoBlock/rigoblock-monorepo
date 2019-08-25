const { CONTRACT_NAMES } = require('./constants')
require('core-js/stable')
require('regenerator-runtime')

module.exports.default = async networkId => {
  const artifacts = CONTRACT_NAMES.map(contractName => `${contractName}.json`)
  const abisPromises = artifacts.map(async artifact => {
    const json = await import('./artifacts/' + artifact)
    if (!json['networks'][networkId]) {
      throw new Error(
        `Make sure contracts are deployed for network Id ${networkId}`
      )
    }
    return {
      [artifact
        .split('/')
        .pop()
        .replace('.json', '')]: {
        abi: json['networks'][networkId].abi,
        address: json['networks'][networkId].address,
        devDoc: json.devDoc,
        userDoc: json.userDoc
      }
    }
  })
  const abisMap = await Promise.all(abisPromises)
  return abisMap.reduce((acc, curr) => ({ ...acc, ...curr }), {})
}
