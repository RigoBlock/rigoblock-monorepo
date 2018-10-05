import Web3 = require('web3')
import ProviderEngine = require('web3-provider-engine')
import * as Contract from './contracts/contract'
import * as FilterSubprovider from 'web3-provider-engine/subproviders/filters'
import * as SubscriptionSubProvider from 'web3-provider-engine/subproviders/subscriptions'
import * as WebSocketSubProvider from 'web3-provider-engine/subproviders/websocket'
import { ContractModels } from './contracts'
import { SignerSubprovider } from '@0xproject/subproviders'
import fetchContracts from '@rigoblock/contracts'

interface Web3Window extends Window {
  web3: Web3
}

declare let window: Web3Window

class Api {
  public contract: ContractModels
  public web3: Web3
  public engine: ProviderEngine

  async startEngine() {
    return new Promise((resolve, reject) => {
      this.engine.start(err => (err ? reject(err) : resolve()))
    })
  }

  async init(web3: Web3 = window.web3, rpcUrl = 'ws://localhost:8545') {
    this.engine = new ProviderEngine()
    this.engine.addProvider(new SignerSubprovider(<any>web3.currentProvider))
    this.engine.addProvider(new FilterSubprovider())
    const subscriptionSubprovider = new SubscriptionSubProvider()
    this.engine.addProvider(subscriptionSubprovider)
    subscriptionSubprovider.on('data', (err, notification) => {
      return this.engine.emit('data', err, notification)
    })
    this.engine.addProvider(
      new WebSocketSubProvider({
        rpcUrl
      })
    )

    this.web3 = new Web3(this.engine)

    await this.startEngine().catch(err => console.error(err))

    const networkId = await this.web3.eth.net.getId()
    const contractsMap: Contract.ContractsMap = await fetchContracts(networkId)
    const contracts = new Contract()
    await contracts.init(contractsMap)
    this.contract = contracts

    return this
  }
}

export default Api
