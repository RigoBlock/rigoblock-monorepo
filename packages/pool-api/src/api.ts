import * as ProviderEngine from 'web3-provider-engine'
import { InjectedWeb3Subprovider } from '@0xproject/subproviders'
import * as RpcSubprovider from 'web3-provider-engine/subproviders/rpc.js'
import { Web3Wrapper } from '@0xproject/web3-wrapper'
import contracts from '@rigoblock/protocol/contracts'
import Contract from './pools'
class PoolsApi {
  _contract: Contract
  _web3: any

  async init() {
    const engine = new ProviderEngine()

    engine.addProvider(new InjectedWeb3Subprovider((<any>window).web3.currentProvider))
    engine.addProvider(
      new RpcSubprovider({
        rpcUrl: 'http://localhost:8545'
      })
    )

    // start polling for new blocks
    engine.on('block', function(block) {
      console.log('================================')
      console.log(
        'BLOCK CHANGED:',
        '#' + block.number.toString('hex'),
        '0x' + block.hash.toString('hex')
      )
      console.log('================================')
    })

    // network connectivity error
    engine.on('error', function(err){
      console.error(err.stack)
    })

    engine.start()

    this._web3 = new Web3Wrapper(engine)
    const networkId = await this._web3.getNetworkIdAsync()
    const contractsMap: object = await contracts(networkId)
    this._contract = await new Contract(engine._providers[0]._injectedWeb3, contractsMap)
  }


  get contract() {
    return this._contract
  }

  get web3() {
    return this._web3
  }
}

export default PoolsApi
