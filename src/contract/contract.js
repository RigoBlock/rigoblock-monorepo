// Copyright 2017 Rigo Investment Sarl.
// This file is part of RigoBlock.

import DragoRegistry from './dragoRegistry';
import Drago from './drago';

class Contract {
  constructor (api) {
    if (!api) {
      throw new Error('API instance needs to be provided to Contract');
    }
    this._dragoregistry = new DragoRegistry(api);
    this._drago = new Drago(api);
  }

  get dragoregistry () {
    return this._dragoregistry;
  }

  get drago () {
    return this._drago;
  }
}

export default Contract;
