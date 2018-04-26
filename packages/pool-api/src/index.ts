// export { default } from './api'
import PoolsApi from './api'

const test = async () => {
  const poolsApi = new PoolsApi()
  await poolsApi.init()

  const myEvent = poolsApi.contract.VaultEventful.rawWeb3Contract.VaultCreated()
  const accountList: string = await poolsApi.web3.getAvailableAddressesAsync()

  myEvent.watch((error, result) => {
    console.log(error || result)
  })

  poolsApi.contract.VaultEventful.rawWeb3Contract
    .VaultCreated({}, { fromBlock: 0 })
    .get((err, data) => data.map(e => console.log(e.args)))
  // console.log(myEvent)
  const randomString = () =>
    Math.random()
      .toString(36)
      .substring(10)
  await poolsApi.contract.VaultFactory.createVaultTx(
    randomString(),
    randomString()
  ).send({
    value: 0,
    from: accountList[0],
    gas: 4700000,
    gasPrice: 100000000000
  })
}
;(async () => {
  await test()
})()
