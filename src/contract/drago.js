// Copyright 2017 Rigo Investment Sarl.
// This file is part of RigoBlock.

import * as abis from './abi';
import Registry from './registry';

class Drago {
  constructor (api) {
    if (!api) {
      throw new Error('API instance needs to be provided to Contract')
    }
    this._api = api
    this._abi = abis.drago
    this._registry = new Registry(api)
    this._constunctorName = this.constructor.name
  }

  instance = (address) => {
    if (!address) {
      throw new Error('Contract address needs to be provided')
    }
    const api = this._api
    const abi = this._abi
    const contractAbi = this._abi
    this._instance = api.newContract(abi, address).instance
  }

  getData = () => {
    const instance = this._instance
    return Promise.all([
      instance.getData.call({})
    ])
  }
}

export default Drago;
