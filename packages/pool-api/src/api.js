// Copyright 2017 Rigo Investment Sarl.
// This file is part of RigoBlock.

import Contracts from './pools';

class PoolsApi {
  constructor (api) {
    // super()
    if (!api) {
      throw new Error('API instance needs to be provided to Contract');
    }
    this._contract = new Contracts(api);
  }

  get contract () {
    return this._contract;
  }
}

export default PoolsApi;
