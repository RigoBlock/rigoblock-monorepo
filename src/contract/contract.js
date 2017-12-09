// Copyright 2017 Rigo Investment Sarl.
// This file is part of RigoBlock.

import DragoRegistryParity from './Parity/dragoRegistry';
import DragoParity from './Parity/drago';
import DragoWeb3 from './Web3/drago';
import EventfulParity from './Parity/eventful';

class Contract {
  constructor (api) {
    if (!api) {
      throw new Error('API instance needs to be provided to Contract');
    }
    this._dragoregistry = new DragoRegistryParity(api);
    if (api._provider.isMetaMask) {
      this._drago = new DragoWeb3(api);
    } else {
      this._drago = new DragoParity(api);
      this._eventful = new EventfulParity(api);
    }
  }

  get dragoregistry () {
    return this._dragoregistry;
  }

  get drago () {
    return this._drago;
  }

  get eventful () {
    return this._eventful;
  }
}

export default Contract;
