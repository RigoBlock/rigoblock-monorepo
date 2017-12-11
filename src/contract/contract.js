// Copyright 2017 Rigo Investment Sarl.
// This file is part of RigoBlock.

import DragoRegistryParity from './Parity/dragoRegistry';
import DragoFactoryParity from './Parity/dragoFactory';
import DragoFactoryWeb3 from './Web3/dragoFactory';
import DragoParity from './Parity/drago';
import DragoWeb3 from './Web3/drago';
import EventfulParity from './Parity/eventful';

class Contract {
  constructor (api) {
    if (!api) {
      throw new Error('API instance needs to be provided to Contract');
    }

    if (api._provider.isMetaMask) {
      this._drago = new DragoWeb3(api);
      this._dragofactory = new DragoFactoryWeb3(api);
    } else {
      this._dragoregistry = new DragoRegistryParity(api);
      this._drago = new DragoParity(api);
      this._dragofactory = new DragoFactoryParity(api);
      this._eventful = new EventfulParity(api);
    }
  }

  get dragoregistry () {
    return this._dragoregistry;
  }

  get drago () {
    return this._drago;
  }

  get dragofactory () {
    return this._dragofactory;
  }

  get eventful () {
    return this._eventful;
  }
}

export default Contract;
