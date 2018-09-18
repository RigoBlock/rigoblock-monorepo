const { CONTRACT_NAMES } = require('../constants')
require('@babel/polyfill')

module.exports.default = async networkId => {
  const artifacts = CONTRACT_NAMES.map(contractName => `${contractName}.json`)
  const abisPromises = artifacts.map(async artifact => {
    const json = await import('../artifacts/' + artifact)
    console.log('JSON', json)
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
        address: json['networks'][networkId].address
      }
    }
  })
  const abisMap = await Promise.all(abisPromises)
  return abisMap.reduce((acc, curr) => ({ ...acc, ...curr }), {})
}
