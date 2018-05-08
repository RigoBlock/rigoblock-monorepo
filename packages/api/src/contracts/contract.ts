import * as Web3 from 'web3'
import { ContractExtension } from './contract-extension'
import { ContractModels } from './'
import { TypeChainContract } from './models/typechain-runtime'

class Contract extends ContractModels {
  async init(web3: Web3, contractsMap: Contract.ContractsMap) {
    const deployedContracts: Array<string> = Object.keys(contractsMap).filter(
      contractName => contractsMap[contractName].address
    )

    type Return = {
      0?: string
      1?: TypeChainContract
    }

    const contractsPromises: Array<Promise<Return[]>> = deployedContracts.map(
      async contractName => {
        const contract: TypeChainContract = await import(`./models/${contractName}`)
        Object.assign(
          contract[contractName].prototype,
          ContractExtension.prototype
        )
        return [
          contractName,
          new contract[contractName](web3, contractsMap[contractName].address)
        ]
      }
    )

    const contracts = await Promise.all(contractsPromises)
    contracts.forEach(contract => {
      Object.defineProperty(this, contract[0].toString(), {
        value: contract[1]
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
