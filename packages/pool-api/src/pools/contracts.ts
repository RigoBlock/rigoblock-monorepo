// import { Drago } from './contracts/Drago'
import { DragoEventful } from './contracts/DragoEventful'
import { DragoFactory } from './contracts/DragoFactory'
import { DragoRegistry } from './contracts/DragoRegistry'
// import Registry from './registry'
// import { RigoToken } from './contracts/RigoToken'
// import { Vault } from './contracts/Vault'
import { VaultEventful } from './contracts/VaultEventful'
import { VaultFactory } from './contracts/VaultFactory'

class Contract {
  // drago: Object
  dragoEventful: Object
  dragoFactory: Object
  dragoRegistry: Object
  // rigoToken: Object
  // vault: Object
  vaultEventful: Object
  vaultFactory: Object
  constructor(api, addresses) {
    if (!api) {
      throw new Error('API instance needs to be provided to Contract')
    }
    // this.drago = new Drago(api, addresses.drago)
    this.dragoEventful = new DragoEventful(api, addresses.DragoEventful)
    this.dragoFactory = new DragoFactory(api, addresses.DragoFactory)
    this.dragoRegistry = new DragoRegistry(api, addresses.DragoRegistry)
    // this.rigoToken = new RigoToken(api, addresses.rigoToken)
    // this.vault = new Vault(api, addresses.vault)
    this.vaultEventful = new VaultEventful(api, addresses.VaultEventful)
    this.vaultFactory = new VaultFactory(api, addresses.VaultFactory)
    // this.registry = new Registry(api, addresses.drago)
  }

  // get Drago() {
  //   return this.drago
  // }

  get DragoRegistry() {
    return this.dragoRegistry
  }

  get DragoFactory() {
    return this.dragoFactory
  }

  get DragoEventful() {
    return this.dragoEventful
  }

  // get registry() {
  //   return this.registry
  // }

  // get RigoToken() {
  //   return this.rigoToken
  // }

  get VaultEventful() {
    return this.vaultEventful
  }

  get VaultFactory() {
    return this.vaultFactory
  }

  // get Vault() {
  //   return this.vault
  // }
}

export default Contract
