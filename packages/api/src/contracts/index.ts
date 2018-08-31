import { Authority } from './models/Authority'
import { Distribution } from './models/Distribution'
import { Drago } from './models/Drago'
import { DragoEventful } from './models/DragoEventful'
import { DragoFactory } from './models/DragoFactory'
import { DragoRegistry } from './models/DragoRegistry'
import { ERC20 } from './models/ERC20'
import { Inflation } from './models/Inflation'
import { Migrations } from './models/Migrations'
import { Owned } from './models/Owned'
import { OwnedUninitialized } from './models/OwnedUninitialized'
import { ProofOfPerformance } from './models/ProofOfPerformance'
import { RigoToken } from './models/RigoToken'
import { UnlimitedAllowanceToken } from './models/UnlimitedAllowanceToken'
import { Vault } from './models/Vault'
import { VaultEventful } from './models/VaultEventful'
import { VaultFactory } from './models/VaultFactory'

// Custom extension
import { ContractExtension } from './contract-extension'

export type EnhancedContract<T> = T & typeof ContractExtension

// typeof Authority & Authority = needed to expose all static methods and
// instance methods of the Authority contract

export abstract class ContractModels {
  Authority: EnhancedContract<typeof Authority & Authority>
  ERC20: EnhancedContract<typeof ERC20 & ERC20>
  RigoToken: EnhancedContract<typeof RigoToken & RigoToken>
  Distribution: EnhancedContract<typeof Distribution & Distribution>
  Inflation: EnhancedContract<typeof Inflation & Inflation>
  UnlimitedAllowanceToken: EnhancedContract<
    typeof UnlimitedAllowanceToken & UnlimitedAllowanceToken
  >
  Drago: EnhancedContract<typeof Drago & Drago>
  Migrations: EnhancedContract<typeof Migrations & Migrations>
  Vault: EnhancedContract<typeof Vault & Vault>
  DragoEventful: EnhancedContract<typeof DragoEventful & DragoEventful>
  Owned: EnhancedContract<typeof Owned & Owned>
  VaultEventful: EnhancedContract<typeof VaultEventful & VaultEventful>
  DragoFactory: EnhancedContract<typeof DragoFactory & DragoFactory>
  OwnedUninitialized: EnhancedContract<
    typeof OwnedUninitialized & OwnedUninitialized
  >
  VaultFactory: EnhancedContract<typeof VaultFactory & VaultFactory>
  DragoRegistry: EnhancedContract<typeof DragoRegistry & DragoRegistry>
  ProofOfPerformance: EnhancedContract<
    typeof ProofOfPerformance & ProofOfPerformance
  >
}
