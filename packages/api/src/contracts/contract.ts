import * as Web3 from 'web3'
import { ContractExtension } from './contract-extension'
import { ContractModels } from './'
import { TypeChainContract } from './models/typechain-runtime'
import contractNames from '../constants'

class Contract extends ContractModels {
  async init(web3: Web3, contractsMap: Contract.ContractsMap) {
    const deployedContracts: Array<string> = Object.keys(contractsMap).filter(
      contractName => contractsMap[contractName].address
    )
    const contractsPromises: Promise<
      [string, TypeChainContract][]
    >[] = contractNames.map(async contractName => {
      const contract: TypeChainContract = await import(`./models/${contractName}`)
      Object.assign(
        contract[contractName].prototype,
        ContractExtension.prototype
      )
      if (contractsMap[contractName].address) {
        return [
          contractName,
          new contract[contractName](web3, contractsMap[contractName].address)
        ]
      }
      return [contractName, contract[contractName]]
    })

    const contracts = await Promise.all(contractsPromises)
    contracts.forEach(item => {
      const [contractName, contract] = item
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
