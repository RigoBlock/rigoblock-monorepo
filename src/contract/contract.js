// Copyright 2017 Rigo Investment Sarl.
// This file is part of RigoBlock.

import DragoRegistry from './Parity/dragoRegistry';
import DragoParity from './Parity/drago';
import DragoWeb3 from './Web3/drago';

class Contract {
  constructor (api) {
    if (!api) {
      throw new Error('API instance needs to be provided to Contract');
    }
    this._dragoregistry = new DragoRegistry(api);
    if (api._provider.isMetaMask) {
      this._drago = new DragoWeb3(api);
    } else {
      this._drago = new DragoParity(api);
    }
  }

  get dragoregistry () {
    return this._dragoregistry;
  }

  get drago () {
    return this._drago;
  }
}

export default Contract;
