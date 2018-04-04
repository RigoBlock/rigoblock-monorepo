// Copyright 2017 Rigo Investment Sarl.
// This file is part of RigoBlock.

import Contract from './contract';

class DragoApi {
  constructor (api) {
    // super()
    if (!api) {
      throw new Error('API instance needs to be provided to Contract');
    }
    this._contract = new Contract(api);
  }

  get contract () {
    return this._contract;
  }
}

export default DragoApi;
