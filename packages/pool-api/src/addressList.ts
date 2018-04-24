import * as Web3 from 'web3'
import { contracts } from '@rigoblock/protocol'

const addressList = async networkId => {
  const contractsMap = await contracts(networkId)
  const addresses = Object.keys(contractsMap)
  .filter(contractName => contractsMap[contractName].address)
  .map(contractName => ({[contractName]: contractsMap[contractName].address})
  )
  .reduce((acc, curr) => Object.assign(acc, curr), {}
  )
  return addresses
}
export default addressList
