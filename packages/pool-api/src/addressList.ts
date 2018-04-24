import contracts from '@rigoblock/protocol'

const addressList = async networkId => {
  const contractsArr = await contracts(networkId)
  const contractsMap = contractsArr.reduce(
    (acc, curr) => Object.assign(acc, curr),
    {}
  )
  const addresses = Object.keys(contractsMap)
    .filter(contractName => contractsMap[contractName].address)
    .map(contractName => ({
      [contractName]: contractsMap[contractName].address
    }))
  return Promise.all(addresses)
}
export default addressList
