// Copyright 2017 Rigo Investment Sarl.
// This file is part of RigoBlock.

// kovan register address 0xfAb104398BBefbd47752E7702D9fE23047E1Bca3

import * as abis from './abi';
import { REGISTRY_KOVAN, REGISTRY_HOMESTEAD } from '../Utils/const'


class Registry {
  constructor (api) {
    if (!api) {
      throw new Error('API instance needs to be provided to Registry')
    }
    this._api = api
    this._constunctorName = this.constructor.name
  }

  _getContractAddressFromRegister = (contractName) =>{
    const api = this._api
    if (!contractName) {
      throw new Error('contractName needs to be provided to Registry')
    }
    if (api.provider._url.includes("infura")) {
      console.log('Infura/MetaMask detected.')
      const registry = api.newContract(abis.registry, REGISTRY_KOVAN).instance;
      return Promise.all([
        registry.getAddress.call({}, [api.util.sha3(contractName), 'A'])
      ])
    }
    return api.parity
    .registryAddress()
    .then((registryAddress) => {
      const registry = api.newContract(abis.registry, registryAddress).instance;
      return Promise.all([
        registry.getAddress.call({}, [api.util.sha3(contractName), 'A'])
      ])
    })
  }

  instance = (abi, contractName) => {
    if (!abi) {
      throw new Error('Contract ABI needs to be provided to Registry')
    }
    if (!contractName) {
      throw new Error('contractName needs to be provided to Registry')
    }
    const api = this._api
    console.log(contractName)
    return this._getContractAddressFromRegister(contractName)
    .then((address) => {
      if (api._provider.isMetaMask) {
        return new api.eth.Contract(abi, address)
      }
      console.log(address)
      console.log(abi)
      return api.newContract(abi, address)
    })
  }

  // instanceDragoFactory = (abi) => {
  //   if (!abi) {
  //     throw new Error('Contract ABI needs to be provided to Registry')
  //   }
  //   const api = this._api
  //   const constunctorName = this._constunctorName
  //   if (api._provider.isMetaMask) {
  //     return new api.eth.Contract(abi, 'e0EA5C76FEB69C14AF9EAF3652849Ea069740ac4')
  //   } else {
  //     return this._getContractAddressFromRegister('dragofactory')
  //     .then((address) => {
  //       console.log('dragoFactory address: '+address)
  //       return api.newContract(abi, address)
  //     })
  //   }
  // }

  // instanceEventful = (abi) => {
  //   if (!abi) {
  //     throw new Error('Contract ABI needs to be provided to Registry')
  //   }
  //   const api = this._api
  //   const constunctorName = this._constunctorName
  //   return this._getContractAddressFromRegister('eventful')
  //   .then((address) => {
  //     return api.newContract(abi, address)
  //   })
  // }


  // instanceExchange = (abi) => {
  //   if (!abi) {
  //     throw new Error('Contract ABI needs to be provided to Registry')
  //   }
  //   const api = this._api
  //   const constunctorName = this._constunctorName
  //   return this._getContractAddressFromRegister('exchange')
  //   .then((address) => {
  //     return api.newContract(abi, address)
  //   })
  // }


}

export default Registry;
