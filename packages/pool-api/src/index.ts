import * as ProviderEngine from 'web3-provider-engine'
import { InjectedWeb3Subprovider } from '@0xproject/subproviders'
import * as RpcSubprovider from 'web3-provider-engine/subproviders/rpc.js'
import Web3 from 'web3'
import addressList from './addressList'

const PoolApi = async() => {
  const engine = new ProviderEngine()
  const web3 = (<any>window).web3

  engine.addProvider(
    new RpcSubprovider({
      rpcUrl: 'http://localhost:8545'
    })
  )
  engine.addProvider(new InjectedWeb3Subprovider((<any>window).web3.currentProvider))
  const networkId = web3.version.network
  console.log(networkId)
  const contractAddresses = await addressList(networkId)
  console.log(contractAddresses)
}

;(async () => {
  await PoolApi()
})()


