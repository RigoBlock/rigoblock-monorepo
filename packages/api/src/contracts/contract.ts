import toSnakeCase = require('to-snake-case')
import { ContractModels } from './'
import Web3Contract from 'web3/eth/contract'

class Contract extends ContractModels {
  async init(contractsMap: Contract.ContractsMap) {
    const contractNames: string[] = Object.keys(contractsMap)
    const contractsPromises: Promise<
      [string, Web3Contract][]
    >[] = contractNames.map(async contractName => {
      const contract: Web3Contract = await import(`./models/${toSnakeCase(
        contractName
      )}`)
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
