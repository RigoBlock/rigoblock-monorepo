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
      console.log('infura')
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

  instanceRegistry = (abi) => {
    if (!abi) {
      throw new Error('Contract ABI needs to be provided to Registry')
    }
    const api = this._api
    const constunctorName = this._constunctorName
    return this._getContractAddressFromRegister('dragoregistry')
    .then((address) => {
      return api.newContract(abi, address)
    })
  }

  instanceDragoFactory = (abi) => {
    if (!abi) {
      throw new Error('Contract ABI needs to be provided to Registry')
    }
    const api = this._api
    const constunctorName = this._constunctorName
    console.log('instanceDragoFactory')
    if (api._provider.isMetaMask) {
      return new api.eth.Contract(abi, '2af877bf6b7a1ce3c36a09a8fedfd816c5007d5f')
    } else {
      return this._getContractAddressFromRegister('dragofactory')
      .then((address) => {
        return api.newContract(abi, address)
      })
    }
  }

  instanceEventful = (abi) => {
    if (!abi) {
      throw new Error('Contract ABI needs to be provided to Registry')
    }
    const api = this._api
    const constunctorName = this._constunctorName
    return this._getContractAddressFromRegister('eventful')
    .then((address) => {
      return api.newContract(abi, address)
    })
  }


}

export default Registry;
