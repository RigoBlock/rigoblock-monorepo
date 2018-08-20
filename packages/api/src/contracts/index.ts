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

// Contract interface to retain static methods of contracts
import { IContract } from './contractInterface'

export abstract class ContractModels {
  Authority: Authority & ContractExtension & IContract
  ERC20: ERC20 & ContractExtension & IContract
  RigoToken: RigoToken & ContractExtension & IContract
  Distribution: Distribution & ContractExtension & IContract
  Inflation: Inflation & ContractExtension & IContract
  UnlimitedAllowanceToken: UnlimitedAllowanceToken &
    ContractExtension &
    IContract
  Drago: Drago & ContractExtension & IContract
  Migrations: Migrations & ContractExtension & IContract
  Vault: Vault & ContractExtension & IContract
  DragoEventful: DragoEventful & ContractExtension & IContract
  Owned: Owned & ContractExtension & IContract
  VaultEventful: VaultEventful & ContractExtension & IContract
  DragoFactory: DragoFactory & ContractExtension & IContract
  OwnedUninitialized: OwnedUninitialized & ContractExtension & IContract
  VaultFactory: VaultFactory & ContractExtension & IContract
  DragoRegistry: DragoRegistry & ContractExtension & IContract
  ProofOfPerformance: ProofOfPerformance & ContractExtension & IContract
}
