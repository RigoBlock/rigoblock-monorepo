// Copyright 2017 Rigo Investment Sarl.
// This file is part of RigoBlock.

// kovan register address 0xfAb104398BBefbd47752E7702D9fE23047E1Bca3

import * as abis from '../contracts/abi';
import { 
  PARITY_REGISTRY_ADDRESSES
 } from '../utils/const'


class Registry {
  constructor(api) {
    if (!api) {
      throw new Error('API instance needs to be provided to Registry')
    }
    this._api = api
    this._constunctorName = this.constructor.name
    this._getContractAddressFromRegister = this._getContractAddressFromRegister.bind(this);
    this._parityRegistryContractAddress = PARITY_REGISTRY_ADDRESSES[api._rb.network.id]
    this._isWeb3 = typeof api.version !== 'undefined' ? true : false
    this._isParity = typeof api._parity !== 'undefined' ? true : false
    this._isInfura = () => {
      if (typeof api.provider !== 'undefined') {
        if (api.provider._url.includes("infura")) {
          return true
        }
      } else {
        return false
      }
    }
  }

  _getParityRegistryContractAddress = () => {
    const api = this._api
    // // Checking if using Web3
    // if (typeof api.version !== 'undefined') {
    //   return api.eth.net.getId()
    //     .then((id) => {
    //       return PARITY_REGISTRY_ADDRESSES[id]
    //     }
    //     )
    // }
    // // Using Parity API
    // return api.parity.chain()
    //   .then((id) => {
    //     return PARITY_REGISTRY_ADDRESSES[id]
    //   }
    //   )
    return PARITY_REGISTRY_ADDRESSES[api._rb.network.id]
  }

  /**
   * @param  {} contractName
   */
  _getContractAddressFromRegister = (contractName) => {
    const api = this._api
    const parityRegistryContractAddress = this._parityRegistryContractAddress
    if (!contractName) {
      throw new Error('contractName needs to be provided to Registry')
    }
    console.log(`${this.constructor.name} -> Looking for contract: ${contractName}`)
    // Checking if using Parity API and/or connected to Infura
    if (typeof api._parity !== 'undefined') {
      if (typeof api.provider !== 'undefined') {
        if (api.provider._url.includes("infura")) {
          console.log(`${this.constructor.name} -> Infura/MetaMask detected.`)
          console.log(`${this.constructor.name} -> Registry found at ${parityRegistryContractAddress}`)
          const registry = api.newContract(abis.parityregister, parityRegistryContractAddress).instance;
          return Promise.all([
            registry.getAddress.call({}, [api.util.sha3(contractName), 'A'])
          ])
        }
      }
      console.log(`${this.constructor.name} -> RigoBlock node detected.`)
      return api.parity
        .registryAddress()
        .then((parityRegistryContractAddress) => {
          console.log(`${this.constructor.name} -> Registry found at ${parityRegistryContractAddress}`)
          const registry = api.newContract(abis.parityregister, parityRegistryContractAddress).instance;
          return Promise.all([
            registry.getAddress.call({}, [api.util.sha3(contractName), 'A'])
          ])

        })
    }
    // Checking if using Web3
    if (typeof api.version !== 'undefined') {
      const registryContract = new api.eth.Contract(abis.parityregister)
      console.log(`${this.constructor.name} -> Web3 detected.`)
      console.log(`${this.constructor.name} -> Registry found at ${parityRegistryContractAddress}`)
      registryContract.options.address = parityRegistryContractAddress
      return Promise.all([
        registryContract.methods.getAddress(api.utils.sha3(contractName), 'A').call()
      ])
      .then((address) => {
        console.log(address)
        return address[0]
      })
    }
  }

  /**
   * @param  {} abi
   * @param  {} contractName
   */
  instance = (abi, contractName) => {
    if (!abi) {
      throw new Error('Contract ABI needs to be provided to Registry')
    }
    if (!contractName) {
      throw new Error('contractName needs to be provided to Registry')
    }
    const api = this._api
    var isMetaMask = false
    const contract = this._getContractAddressFromRegister(contractName)
    .then((address) => {
      if (address[0] == "0x0000000000000000000000000000000000000000") {
        throw new Error('The contract address was not found in the Register.')
      }
      if (!api) {
        throw new Error('API instance needs to be provided to Contract');
      }
      if (typeof api._provider === 'undefined') {
        isMetaMask = false
      } else {
        isMetaMask = api._provider.isMetaMask
      }
      if (isMetaMask) {
        console.log(`${this.constructor.name} -> Contract ${contractName} found at ${address}`)
        return new api.eth.Contract(abi, address)
      }
      console.log(`${this.constructor.name} -> Contract ${contractName} found at ${address}`)
      return api.newContract(abi, address)
    })
    return contract
  }
}

export default Registry;
