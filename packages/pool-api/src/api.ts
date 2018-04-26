import * as ProviderEngine from 'web3-provider-engine'
import { InjectedWeb3Subprovider } from '@0xproject/subproviders'
import * as RpcSubprovider from 'web3-provider-engine/subproviders/rpc.js'
import contracts from '@rigoblock/protocol/contracts'
import Contract from './pools/contracts'
class PoolsApi {
  _contract: Contract

  async init() {
    const engine = new ProviderEngine()

    engine.addProvider(
      new RpcSubprovider({
        rpcUrl: 'http://localhost:8545'
      })
    )
    engine.addProvider(new InjectedWeb3Subprovider((<any>window).web3.currentProvider))
    const web3 = engine._providers[1]._injectedWeb3
    const networkId: Number = web3.version.network
    const contractsMap = await contracts(networkId)
    this._contract = await new Contract(web3, contractsMap)
  }

  get contract() {
    return this._contract
  }
}

export default PoolsApi

