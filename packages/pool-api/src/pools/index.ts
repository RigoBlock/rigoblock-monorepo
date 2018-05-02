import { Authority } from './contracts/Authority'
import { ERC20 } from './contracts/ERC20'
import { RigoToken } from './contracts/RigoToken'
import { Distribution } from './contracts/Distribution'
import { Inflation } from './contracts/Inflation'
import { UnlimitedAllowanceToken } from './contracts/UnlimitedAllowanceToken'
import { Drago } from './contracts/Drago'
import { Migrations } from './contracts/Migrations'
import { Vault } from './contracts/Vault'
import { DragoEventful } from './contracts/DragoEventful'
import { Owned } from './contracts/Owned'
import { VaultEventful } from './contracts/VaultEventful'
import { DragoFactory } from './contracts/DragoFactory'
import { OwnedUninitialized } from './contracts/OwnedUninitialized'
import { VaultFactory } from './contracts/VaultFactory'
import { DragoRegistry } from './contracts/DragoRegistry'
import { ProofOfPerformance } from './contracts/ProofOfPerformance'

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
