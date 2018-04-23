// import Web3 from 'web3'
import { Authority } from '../contracts/Authority'
import { VaultFactory } from '../dist/VaultFactory'
import { VaultEventful } from '../dist/VaultEventful'
// import Web3 from 'web3'
const Web3 = require('web3')

const vaultFactoryAddress = '0x7ce6e371085cb611fb46d5065397223ef2f952ff'
const vaultEventfulAddress = '0x6dddcaede2071883c85c6e5781524985608d2460'
const defaultAccount = '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196'

const test = async () => {
  const web3 = new Web3(
    new Web3.providers.HttpProvider('http://localhost:8545')
  )

  const vaultFactory = await VaultFactory.createAndValidate(
    web3,
    vaultFactoryAddress
  )
  const vaultEventful = await VaultEventful.createAndValidate(
    web3,
    vaultEventfulAddress
  )
  const myEvent = vaultEventful.rawWeb3Contract.VaultCreated()

  myEvent.watch((error, result) => {
    console.log(error || result.args)
  })

  const randomString = () =>
    Math.random()
      .toString(36)
      .substring(10)
  const test = await vaultFactory
    .createVaultTx(randomString(), randomString())
    .send({
      value: 0,
      from: defaultAccount,
      gas: 4700000,
      gasPrice: 100000000000
    })
}
;(async () => {
  await test()
})()
