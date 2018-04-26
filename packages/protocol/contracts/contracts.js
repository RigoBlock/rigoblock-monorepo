const { CONTRACT_NAMES } = require('../constants')

export default async networkId => {
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
      : console.error('Make sure MetaMask is connected to Ganache!')
  })
  const abisMap = await Promise.all(abisPromises)
  return abisMap.reduce((acc, curr) => ({ ...acc, ...curr }), {})
}
