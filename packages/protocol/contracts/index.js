const { CONTRACT_NAMES } = require('../constants')

module.exports = async networkId => {
  const artifacts = CONTRACT_NAMES.map(contractName => `${contractName}.json`)
  const abisPromises = artifacts.map(async artifact => {
    const json = await import('../artifacts/' + artifact)
    return json['networks'][networkId]
      ? {
          [artifact
            .split('/')
            .pop()
            .replace('.json', '')]: {
            abi: json['networks'][networkId].abi,
            address: json['networks'][networkId].address
          }
        }
      : console.error(
          `Make sure contracts are deployed for network Id: ${networkId}`
        )
  })
  const abisMap = await Promise.all(abisPromises)
  return abisMap.reduce((acc, curr) => ({ ...acc, ...curr }), {})
}
