// Copyright 2017 Rigo Investment Sarl.
// This file is part of RigoBlock.

import DragoRegistryParity from './Parity/dragoRegistry';
import DragoFactoryParity from './Parity/dragoFactory';
import DragoFactoryWeb3 from './Web3/dragoFactory';
import DragoParity from './Parity/drago';
import DragoWeb3 from './Web3/drago';
import EthusdParity from './Parity/ethusd';
import EventfulParity from './Parity/eventful';
import ExchangeParity from './Parity/exchange';
import RegistryParity from './registry';

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
      this._exchange = new ExchangeParity(api);
      this._eventful = new EventfulParity(api);
      this._registry = new RegistryParity(api);
      this._ethusd = new EthusdParity(api);
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

  get ethusd () {
    return this._ethusd;
  }

  get eventful () {
    return this._eventful;
  }

  get exchange () {
    return this._exchange;
  }

  get registry () {
    return this._registry;
  }
}

export default Contract;
