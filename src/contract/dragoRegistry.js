// Copyright 2017 Rigo Investment Sarl.
// This file is part of RigoBlock.

import * as abis from './abi';

class DragoRegistry {
  constructor (api) {
    // super()
    if (!api) {
      throw new Error('API instance needs to be provided to Contract')
    }
    this._api = api
    this._abi = abis.registry
    this._constunctorName = this.constructor.name
  }

  instance = () => {
    const api = this._api
    const constunctorName = this._constunctorName
    console.log()
    return api.parity
    .registryAddress()
    .then((registryAddress) => {
      const registry = api.newContract(this._abi, registryAddress).instance;
      return Promise.all([
          registry.getAddress.call({}, [api.util.sha3('dragoregistry'), 'A'])
      ]);
    })
    .then((address) => {
      console.log(`${constunctorName} -> The drago registry was found at ${address}`);
      this._instance = api.newContract(abis.dragoregistry, address).instance
    })
  }

  drago = (dragoID) => {
    if (!dragoID) {
      throw new Error('drago function needs to be provided to dragoID')
    }
    return Promise.all([
      this._instance.drago.call({}, [dragoID])
    ])
  }
}

export default DragoRegistry;
