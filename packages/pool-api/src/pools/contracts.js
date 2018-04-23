import Drago from './contracts/Drago'
import DragoEventful from './contracts/DragoEventful'
import DragoFactory from './contracts/DragoFactory'
import DragoRegistry from './contracts/DragoRegistry'
import Ethusd from './contracts/Ethusd'
import Ether from './contracts/Ether'
import Exchange from './contracts/exchange'
import Registry from './registry'
import RigoToken from './contracts/RigoToken'
import Vault from './contracts/Vault'
import VaultEventful from './contracts/VaultEventful'
import VaultFactory from './contracts/VaultFactory'

class Contract {
  constructor(api) {
    if (!api) {
      throw new Error('API instance needs to be provided to Contract')
    }
    this._drago = new Drago(api)
    this._dragoeventful = new DragoEventful(api)
    this._dragofactory = new DragoFactory(api)
    this._dragoregistry = new DragoRegistry(api)
    this._ethusd = new Ethusd(api)
    this._ether = new Ether(api)
    this._exchange = new Exchange(api)
    this._registry = new Registry(api)
    this._rigotoken = new RigoToken(api)
    this._vault = new Vault(api)
    this._vaulteventful = new VaultEventful(api)
    this._vaultfactory = new VaultFactory(api)
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
