// import * as Web3 from 'web3'
import contracts from '@rigoblock/protocol'

const addressList = async networkId => {
  const contractsArr = await contracts(networkId)
  const contractsMap = contractsArr.reduce(
    (acc, curr) => Object.assign(acc, curr),
    {}
  )
  // const addresses = Object.keys(contractsMap)
  //   .filter(contractName => contractsMap[contractName].address)
  //   .map(contractName => ({
  //     [contractName]: contractsMap[contractName].address
  //   }))
  //   .reduce((acc, curr) => Object.assign(acc, curr), {})
  return contractsMap
  // return addresses
}
export default addressList
