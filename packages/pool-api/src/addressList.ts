import contracts from '@rigoblock/protocol'

const addressList = async networkId => {
  const contractsMap = await contracts(networkId)
  const contractsAddresses = Object.keys(contractsMap)
    .filter(contractName => contractsMap[contractName].address)
    .map(contractName => ({
      [contractName]: contractsMap[contractName].address
    }))
    .reduce((acc, curr) => Object.assign(acc, curr), {})
  return contractsAddresses
}
export default addressList
