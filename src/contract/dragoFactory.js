// Copyright 2017 Rigo Investment Sarl.
// This file is part of RigoBlock.

import * as abis from './contracts';

class DragoFactory {
  constructor (api) {
    super()
    if (!api) {
      throw new Error('API instance needs to be provided to Contract');
    }
    this._api = api
    this._abi = abis.registry
  }

  totalSupply = (dragoAddress, api, callBack) => {
    const instance = api.newContract(this._abi, dragoAddress).instance
    var sourceLogClass = this.constructor.name
    return instance.totalSupply
      .call({},[])
    }
}

module.exports = DragoFactory;
