import * as ProviderEngine from 'web3-provider-engine'
import { InjectedWeb3Subprovider } from '@0xproject/subproviders'
import * as RpcSubprovider from 'web3-provider-engine/subproviders/rpc.js'
import Web3 from 'web3'
import Contract from './pools/contracts'
import addressList from './addressList'

class PoolsApi {
  _contract: Object

  async init() {
    const engine = new ProviderEngine()
    const web3 = (<any>window).web3
    engine.addProvider(
      new RpcSubprovider({
        rpcUrl: 'http://localhost:8545'
      })
    )
    engine.addProvider(new InjectedWeb3Subprovider((<any>window).web3.currentProvider))
    const networkId = web3.version.network
    const contractsAddresses = await addressList(networkId)
    this._contract = new Contract(web3, contractsAddresses)
  }

  get contract() {
    return this._contract
  }
}

export default PoolsApi

