import Web3 = require('web3')
import ProviderEngine = require('web3-provider-engine')
import * as Contract from './contracts/contract'
import * as FilterSubprovider from 'web3-provider-engine/subproviders/filters'
import * as SubscriptionSubProvider from 'web3-provider-engine/subproviders/subscriptions'
import { ContractsList } from './contracts/contractsList'
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
  /**
   * List of contract instances exposed by the API
   */
  public contract: ContractsList
  /**
   * Web3 instance in use
   */
  public web3: Web3
  /**
   * Metamask's provider engine instance
   */
  public engine: ProviderEngineFix

  /**
   * Promisified version of ProviderEngine start method
   * starts the provider engine connections (e.g. WS)
   * @returns a promise that fulfils when the engine is started
   */
  async startEngine() {
    return new Promise((resolve, reject) => {
      this.engine.start(err => (err ? reject(err) : resolve()))
    })
  }

  /**
   * Initializes the RigoBlock API, starts the websocket connection and wallet integration
   * @param  {Web3=window['web3']} web3 Web3 instance, if non provided then window.web3 is used
   * @returns the api instance
   */
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
