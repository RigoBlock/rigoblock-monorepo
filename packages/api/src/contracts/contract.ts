import * as Web3 from 'web3'
import { ContractExtension } from './contract-extension'
import { ContractModels } from './'
import { TypeChainContract } from './models/typechain-runtime'

class Contract extends ContractModels {
  async init(web3: Web3, contractsMap: Contract.ContractsMap) {
    const contractNames: string[] = Object.keys(contractsMap)
    const contractsPromises: Promise<
      [string, TypeChainContract][]
    >[] = contractNames.map(async contractName => {
      const contract: TypeChainContract = await import(`./models/${contractName}`)
      Object.assign(contract[contractName], ContractExtension)
      Object.assign(
        contract[contractName].prototype,
        ContractExtension.prototype
      )
      if (contractsMap[contractName].address) {
        contract[contractName].address = contractsMap[contractName].address
      }
      return [contractName, contract[contractName]]
    })

    const contracts = await Promise.all(contractsPromises)
    contracts.forEach(([contractName, contract]) => {
      Object.defineProperty(this, contractName.toString(), {
        value: contract
      })
    })

    return this
  }
}

namespace Contract {
  export interface ContractsMap {
    [key: string]: {
      address: string
      abi: string
    }
  }
}

export = Contract
