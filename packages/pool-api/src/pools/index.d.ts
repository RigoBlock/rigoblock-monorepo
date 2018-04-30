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

export type ContractModels = {
  Authority?: Authority
  ERC20?: ERC20
  RigoToken?: RigoToken
  Distribution?: Distribution
  Inflation?: Inflation
  UnlimitedAllowanceToken?: UnlimitedAllowanceToken
  Drago?: Drago
  Migrations?: Migrations
  Vault?: Vault
  DragoEventful?: DragoEventful
  Owned?: Owned
  VaultEventful?: VaultEventful
  DragoFactory?: DragoFactory
  OwnedUninitialized?: OwnedUninitialized
  VaultFactory?: VaultFactory
  DragoRegistry?: DragoRegistry
  ProofOfPerformance?: ProofOfPerformance
}
