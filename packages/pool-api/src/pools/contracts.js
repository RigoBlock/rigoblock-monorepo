// Copyright 2017 Rigo Investment Sarl.
// This file is part of RigoBlock.

import DragoEventfulParity from './Parity/dragoEventful'
import DragoFactoryParity from './Parity/dragoFactory'
import DragoFactoryWeb3 from './Web3/dragoFactory'
import DragoParity from './Parity/drago'
import DragoRegistryParity from './Parity/dragoRegistry'
import DragoWeb3 from './Web3/drago'
import EthusdParity from './Parity/ethusd'
import EtherParity from './Parity/ether'
import EtherWeb3 from './Web3/ether'
import ExchangeParity from './Parity/exchange'
import RegistryParity from './registry'
import RigoTokenParity from './Parity/rigoToken'
import RigoTokenWeb3 from './Web3/rigoToken'
import VaultEventfulParity from './Parity/vaultEventful'
import VaultFactoryParity from './Parity/vaultFactory'
import VaultFactoryWeb3 from './Web3/vaultFactory'
import VaultParity from './Parity/vault'
import VaultWeb3 from './Web3/vault'

class Contract {
  constructor(api) {
    var isMetaMask = false
    if (!api) {
      throw new Error('API instance needs to be provided to Contract')
    }
    if (typeof api._provider === 'undefined') {
      isMetaMask = false
    } else {
      isMetaMask = api._provider.isMetaMask
    }
    if (isMetaMask) {
      this._drago = new DragoWeb3(api)
      this._dragofactory = new DragoFactoryWeb3(api)
      this._ether = new EtherWeb3(api)
      this._vault = new VaultWeb3(api)
      this._vaultfactory = new VaultFactoryWeb3(api)
      this._rigotoken = new RigoTokenWeb3(api)
    } else {
      this._drago = new DragoParity(api)
      this._dragoeventful = new DragoEventfulParity(api)
      this._dragofactory = new DragoFactoryParity(api)
      this._dragoregistry = new DragoRegistryParity(api)
      this._ethusd = new EthusdParity(api)
      this._ether = new EtherParity(api)
      this._exchange = new ExchangeParity(api)
      this._registry = new RegistryParity(api)
      this._rigotoken = new RigoTokenParity(api)
      this._vault = new VaultParity(api)
      this._vaulteventful = new VaultEventfulParity(api)
      this._vaultfactory = new VaultFactoryParity(api)
    }
  }

  get dragoregistry() {
    return this._dragoregistry
  }

  get drago() {
    return this._drago
  }

  get dragofactory() {
    return this._dragofactory
  }

  get ethusd() {
    return this._ethusd
  }

  get dragoeventful() {
    return this._dragoeventful
  }

  get ether() {
    return this._ether
  }

  get exchange() {
    return this._exchange
  }

  get registry() {
    return this._registry
  }

  get rigotoken() {
    return this._rigotoken
  }

  get vaulteventful() {
    return this._vaulteventful
  }

  get vaultfactory() {
    return this._vaultfactory
  }

  get vault() {
    return this._vault
  }
}

export default Contract
