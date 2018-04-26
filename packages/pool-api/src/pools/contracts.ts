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
  dragoEventful: DragoEventful
  dragoFactory: DragoFactory
  dragoRegistry: DragoRegistry
  vaultEventful: VaultEventful
  vaultFactory: VaultFactory
  // drago: Object
  // rigoToken: Object
  // vault: Object
  constructor(api, contractsAddresses) {
    if (!api) {
      throw new Error('API instance needs to be provided to Contract')
    }
    // this.drago = new Drago(api, contractsAddresses.drago)
    this.dragoEventful = new DragoEventful(
      api,
      contractsAddresses.DragoEventful
    )
    this.dragoFactory = new DragoFactory(api, contractsAddresses.DragoFactory)
    this.dragoRegistry = new DragoRegistry(
      api,
      contractsAddresses.DragoRegistry
    )
    // this.rigoToken = new RigoToken(api, contractsAddresses.rigoToken)
    // this.vault = new Vault(api, contractsAddresses.vault)
    this.vaultEventful = new VaultEventful(
      api,
      contractsAddresses.VaultEventful
    )
    this.vaultFactory = new VaultFactory(api, contractsAddresses.VaultFactory)
    // this.registry = new Registry(api, contractsAddresses.drago)
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
