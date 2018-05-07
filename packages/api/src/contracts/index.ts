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
