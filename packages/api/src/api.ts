import Web3 = require('web3')
import ProviderEngine = require('web3-provider-engine')
import * as Contract from './contracts/contract'
import * as RpcSubprovider from 'web3-provider-engine/subproviders/rpc.js'
import { ContractModels } from './contracts'
import { SignerSubprovider } from '@0xproject/subproviders'
import fetchContracts from '@rigoblock/contracts'

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
  public web3: Web3
  public engine: ProviderEngine

  async startEngine() {
    return new Promise((resolve, reject) => {
      this.engine.start(err => (err ? reject(err) : resolve()))
    })
  }

  async init(web3: Web3 = window.web3) {
    this.engine = new ProviderEngine()
    this.engine.addProvider(new SignerSubprovider(<any>web3.currentProvider))
    this.engine.addProvider(
      new RpcSubprovider({
        rpcUrl: 'http://localhost:8545'
      })
    )

    this.web3 = new Web3(this.engine)

    const networkId = await web3.eth.net.getId()
    const contractsMap: Contract.ContractsMap = await fetchContracts(networkId)
    const contracts = new Contract()
    await contracts.init(web3, contractsMap)
    this.contract = contracts

    await this.startEngine().catch(err => {
      console.error('Err', err)
    })

    return this
  }
}

export default Api
