import { Authority } from './models/authority'
import { Distribution } from './models/distribution'
import { Drago } from './models/drago'
import { DragoEventful } from './models/drago_eventful'
import { DragoFactory } from './models/drago_factory'
import { DragoRegistry } from './models/drago_registry'
import { ERC20 } from './models/erc20'
import { Inflation } from './models/inflation'
import { Migrations } from './models/migrations'
import { Owned } from './models/owned'
import { OwnedUninitialized } from './models/owned_uninitialized'
import { ProofOfPerformance } from './models/proof_of_performance'
import { RigoToken } from './models/rigo_token'
import { UnlimitedAllowanceToken } from './models/unlimited_allowance_token'
import { Vault } from './models/vault'
import { VaultEventful } from './models/vault_eventful'
import { VaultFactory } from './models/vault_factory'

// typeof Authority & Authority = needed to expose all static methods and
// instance methods of the Authority contract

export abstract class ContractModels {
  Authority: typeof Authority & Authority
  ERC20: typeof ERC20 & ERC20
  RigoToken: typeof RigoToken & RigoToken
  Distribution: typeof Distribution & Distribution
  Inflation: typeof Inflation & Inflation
  UnlimitedAllowanceToken: typeof UnlimitedAllowanceToken &
    UnlimitedAllowanceToken
  Drago: typeof Drago & Drago
  Migrations: typeof Migrations & Migrations
  Vault: typeof Vault & Vault
  DragoEventful: typeof DragoEventful & DragoEventful
  Owned: typeof Owned & Owned
  VaultEventful: typeof VaultEventful & VaultEventful
  DragoFactory: typeof DragoFactory & DragoFactory
  OwnedUninitialized: typeof OwnedUninitialized & OwnedUninitialized
  VaultFactory: typeof VaultFactory & VaultFactory
  DragoRegistry: typeof DragoRegistry & DragoRegistry
  ProofOfPerformance: typeof ProofOfPerformance & ProofOfPerformance
}
