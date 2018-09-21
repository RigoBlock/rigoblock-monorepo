import ProviderEngine = require('web3-provider-engine')
import * as Contract from './contracts/contract'
import * as RpcSubprovider from 'web3-provider-engine/subproviders/rpc.js'
import * as Web3 from 'web3'
import { ContractModels } from './contracts'
import { InjectedWeb3Subprovider } from '@0xproject/subproviders'
import { Web3Wrapper } from '@0xproject/web3-wrapper'
import protocol from '@rigoblock/contracts'

interface Web3Window extends Window {
  web3: Web3
}

declare let window: Web3Window

// Fix until 0x types are in sync with provider engine
export interface ProviderEngineFix extends ProviderEngine {
  start(cb?: Function): void
}
class Api {
  public contract: ContractModels
  public web3: Web3Wrapper
  public engine: ProviderEngineFix

  async startEngine() {
    return new Promise((resolve, reject) => {
      this.engine.start(err => (err ? reject(err) : resolve()))
    })
  }

  async init(web3: Web3 = window.web3) {
    this.engine = new ProviderEngine()
    this.engine.addProvider(new InjectedWeb3Subprovider(web3.currentProvider))
    this.engine.addProvider(
      new RpcSubprovider({
        rpcUrl: 'http://localhost:8545'
      })
    )

    this.web3 = new Web3Wrapper(this.engine)

    const networkId = await new Promise((resolve, reject) =>
      web3.version.getNetwork(
        (err, networkId) => (err ? reject(err) : resolve(networkId))
      )
    )

    const contractsMap: Contract.ContractsMap = await protocol(networkId)
    const contracts = new Contract()
    await contracts.init(web3, contractsMap)
    this.contract = contracts

    await this.startEngine()

    return this
  }
}

export default Api
