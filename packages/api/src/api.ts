import ProviderEngine = require('web3-provider-engine')
import * as Contract from './contracts/contract'
import * as RpcSubprovider from 'web3-provider-engine/subproviders/rpc.js'
import * as Web3 from 'web3'
import { ContractModels } from './contracts'
import { InjectedWeb3Subprovider } from '@0xproject/subproviders'
import protocol from '@rigoblock/protocol/contracts'

interface Web3Window extends Window {
  web3: Web3
}

declare let window: Web3Window
class Api {
  public contract: ContractModels
  public web3: Web3
  public engine: ProviderEngine

  async init(web3: Web3 = window.web3) {
    this.engine = new ProviderEngine()
    this.engine.addProvider(new InjectedWeb3Subprovider(web3.currentProvider))
    this.engine.addProvider(
      new RpcSubprovider({
        rpcUrl: 'http://localhost:8545'
      })
    )

    this.web3 = web3
    const networkId = this.web3.version.network
    const contractsMap: Contract.ContractsMap = await protocol(networkId)
    const contracts = new Contract()
    await contracts.init(this.web3, contractsMap)
    this.contract = contracts

    this.engine.start()
    return this
  }
}

export default Api
