// Copyright 2017 Rigo Investment Sarl.
// This file is part of RigoBlock.

import * as abis from './abi';

class Registry {
  constructor (api) {
    if (!api) {
      throw new Error('API instance needs to be provided to Registry')
    }
    this._api = api
    this._constunctorName = this.constructor.name
  }

  instanceRegistry = (abi) => {
    if (!abi) {
      throw new Error('Contract ABI needs to be provided to Registry')
    }
    const api = this._api
    const constunctorName = this._constunctorName
    return api.parity
    .registryAddress()
    .then((registryAddress) => {
      const registry = api.newContract(abis.registry, registryAddress).instance;
      return Promise.all([
        registry.getAddress.call({}, [api.util.sha3('dragoregistry'), 'A'])
      ]);
    })
    .then((address) => {
      // console.log(`${constunctorName} -> The Drago registry was found at ${address}`);
      return api.newContract(abi, address)
    })
  }

  instanceEventful = (abi) => {
    if (!abi) {
      throw new Error('Contract ABI needs to be provided to Registry')
    }
    const api = this._api
    const constunctorName = this._constunctorName
    return api.parity
    .registryAddress()
    .then((registryAddress) => {
      const registry = api.newContract(abis.registry, registryAddress).instance;
      return Promise.all([
        registry.getAddress.call({}, [api.util.sha3('eventful'), 'A'])
      ]);
    })
    .then((address) => {
      // console.log(`${constunctorName} -> The Drago registry was found at ${address}`);
      return api.newContract(abi, address)
    })
  }
}

export default Registry;
