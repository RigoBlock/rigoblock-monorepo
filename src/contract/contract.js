// Copyright 2017 Rigo Investment Sarl.
// This file is part of RigoBlock.

import DragoRegistry from './dragoRegistry';

class Contract {
  constructor (api) {
    // super()
    if (!api) {
      throw new Error('API instance needs to be provided to Contract');
    }
    this._dragoregistry = new DragoRegistry(api);
  }

  get dragoregistry () {
    return this._dragoregistry;
  }
}

export default Contract;
