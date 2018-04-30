import { ContractModels } from '.'
import * as Web3 from 'web3'
import { TypeChainContract } from './contracts/typechain-runtime'

class Contract {
  public models: ContractModels = {}

  async init(web3: Web3, contractsMap: Contract.ContractsMap) {
    const deployedContracts: Array<string> = Object.keys(contractsMap).filter(
      contractName => contractsMap[contractName].address
    )

    const contractsPromises: Array<
      Promise<TypeChainContract>
    > = deployedContracts.map(async contractName => {
      const contract: TypeChainContract = await import(`./contracts/${contractName}`)
      return new contract[contractName](
        web3,
        contractsMap[contractName].address
      )
    })

    const contracts = await Promise.all(contractsPromises)
    contracts.forEach(contract => {
      this.models[contract.constructor.name] = contract
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
