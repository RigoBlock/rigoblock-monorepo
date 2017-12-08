// Copyright 2017 Rigo Investment Sarl.
// This file is part of RigoBlock.

import * as abis from '../abi';
import Registry from '../registry';

class DragoRegistry {
  constructor (api) {
    if (!api) {
      throw new Error('API instance needs to be provided to Contract')
    }
    this._api = api
    this._abi = abis.dragoregistry
    this._registry = new Registry(api)
    this._constunctorName = this.constructor.name
  }

  instance = () => {
    const contractAbi = this._abi
    return this._registry.instanceRegistry(contractAbi)
      .then (instance => {
        this._instance = instance
        return instance
      })
  }

  drago = (dragoID) => {
    if (!dragoID) {
      throw new Error('DragoID needs to be provided to drago')
    }
    const instance = this._instance
    return Promise.all([
      instance.drago.call({}, [dragoID])
    ])
  }

  fromAddress = (dragoAddress) => {
    if (!dragoAddress) {
      throw new Error(`dragoAddress needs to be provided to ${arguments.callee.toString()}`)
    }
    const instance = this._instance
    return instance.fromAddress.call({}, [dragoAddress])
  }
}

export default DragoRegistry;
