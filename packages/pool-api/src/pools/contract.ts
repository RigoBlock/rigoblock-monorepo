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
import '@0xproject/typescript-typings/types/web3'
import * as Web3 from 'web3'
import { TypeChainContract } from './contracts/typechain-runtime'

class Contract {
  public Authority: Authority

  async init(web3: Web3, contractsMap: Contract.ContractsMap) {
    const deployedContracts: Array<string> = Object.keys(contractsMap).filter(
      contractName => contractsMap[contractName].address
    )

    const contractsPromises: Array<
      Promise<TypeChainContract>
    > = deployedContracts.map(async contractName => {
      const contract: TypeChainContract = await import(`./pools/contracts/${contractName}`)
      return new contract[contractName](
        web3,
        contractsMap[contractName].address
      )
    })

    const contracts = await Promise.all(contractsPromises)

    contracts.forEach(contract => {
      Object.defineProperty(this, contract.constructor.name, {
        get: () => contract
      })
    })

    return this
  }
}

namespace Contract {
  export interface ContractObject {
    address: string
    abi: string
  }

  export interface ContractsMap {
    [key: string]: ContractObject
  }
}

export = Contract
