import { Authority } from './models/Authority'
import { ERC20 } from './models/ERC20'
import { RigoToken } from './models/RigoToken'
import { Distribution } from './models/Distribution'
import { Inflation } from './models/Inflation'
import { UnlimitedAllowanceToken } from './models/UnlimitedAllowanceToken'
import { Drago } from './models/Drago'
import { Migrations } from './models/Migrations'
import { Vault } from './models/Vault'
import { DragoEventful } from './models/DragoEventful'
import { Owned } from './models/Owned'
import { VaultEventful } from './models/VaultEventful'
import { DragoFactory } from './models/DragoFactory'
import { OwnedUninitialized } from './models/OwnedUninitialized'
import { VaultFactory } from './models/VaultFactory'
import { DragoRegistry } from './models/DragoRegistry'
import { ProofOfPerformance } from './models/ProofOfPerformance'

// Custom extension
import { ContractExtension } from './contract-extension'

export abstract class ContractModels {
  Authority: Authority & ContractExtension
  ERC20: ERC20 & ContractExtension
  RigoToken: RigoToken & ContractExtension
  Distribution: Distribution & ContractExtension
  Inflation: Inflation & ContractExtension
  UnlimitedAllowanceToken: UnlimitedAllowanceToken & ContractExtension
  Drago: Drago & ContractExtension
  Migrations: Migrations & ContractExtension
  Vault: Vault & ContractExtension
  DragoEventful: DragoEventful & ContractExtension
  Owned: Owned & ContractExtension
  VaultEventful: VaultEventful & ContractExtension
  DragoFactory: DragoFactory & ContractExtension
  OwnedUninitialized: OwnedUninitialized & ContractExtension
  VaultFactory: VaultFactory & ContractExtension
  DragoRegistry: DragoRegistry & ContractExtension
  ProofOfPerformance: ProofOfPerformance & ContractExtension
}
