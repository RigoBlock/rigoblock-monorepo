import * as ProviderEngine from 'web3-provider-engine'
import { InjectedWeb3Subprovider } from '@0xproject/subproviders'
import * as RpcSubprovider from 'web3-provider-engine/subproviders/rpc.js'
import Web3 from 'web3'
import Contracts from './pools/contracts'
import addressList from './addressList'

// const addressList = {
//   Authority: '0x7e6957630956f2b5ecc3f16e65a28c26032b1a59',
//   DragoEventful: '0xbee872b112cad5a1bf8d2d3756360665da818cfb',
//   DragoFactory: '0x6f355cfdeda5188fe5fff5e939a40af9fde3c845',
//   DragoRegistry: '0xf7cbb0849d4a8ec5ab4650030fa776c00eb52da7',
//   VaultEventful: '0x6dddcaede2071883c85c6e5781524985608d2460',
//   VaultFactory: '0x7ce6e371085cb611fb46d5065397223ef2f952ff'
// }

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
  // const contracts = new Contracts(web3, addressList)
  // console.log(contracts.VaultFactory)
  const addresses = await addressList(networkId)
  console.log(addresses)
}

;(async () => {
  await PoolApi()
})()


