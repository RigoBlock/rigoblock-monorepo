import Web3 = require('web3')
import ProviderEngine = require('web3-provider-engine')
import * as Contract from './contracts/contract'
import * as FilterSubprovider from 'web3-provider-engine/subproviders/filters'
import * as SubscriptionSubProvider from 'web3-provider-engine/subproviders/subscriptions'
import { ContractModels } from './contracts'
import { RPC_URLS } from './constants'
import { SignerSubprovider } from '@0x/subproviders'
/*
 We made a copy of the Websocket subProvider as the original from MetaMask had a
 breaking bug preventing us to connect to Infura. An issue has been opened on their repo,
 but we got no response yet: https://github.com/MetaMask/provider-engine/pull/297
 This is hopefully a temporary fix, if / when they will fix the original subprovider we will revert
 and import the correct one.
*/
import WebSocketSubProvider from './webSocketSubprovider'
import fetchContracts from '@rigoblock/contracts'

export interface ProviderEngineFix extends ProviderEngine {
  start(cb?: Function): void
  emit?(name: string, err: any, notification: any): void
}
class Api {
  public contract: ContractModels
  public web3: Web3
  public engine: ProviderEngineFix

  async startEngine() {
    return new Promise((resolve, reject) => {
      this.engine.start(err => (err ? reject(err) : resolve()))
    })
  }

  async init(web3: Web3 = window['web3']) {
    const networkPromise: Promise<number> = new Promise((resolve, reject) => {
      window['web3'].version.getNetwork((err, res) =>
        err ? reject(err) : resolve(res)
      )
    })
    const networkId = await networkPromise
    const rpcUrl = RPC_URLS[networkId]

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

    const contractsMap: Contract.ContractsMap = await fetchContracts(networkId)
    const contracts = new Contract()
    await contracts.init(contractsMap)
    this.contract = contracts

    return this
  }
}

export default Api
