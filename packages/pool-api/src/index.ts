// export { default } from './api'
import PoolApi from './api'

const test = async () => {
  const poolApi = new PoolApi()
  await poolApi.init()

  const myEvent = poolApi.contract.VaultEventful.rawWeb3Contract.VaultCreated()
  const accountList: Array<string> = poolApi.web3.eth.accounts

  myEvent.watch((error, result) => {
    console.log(error || result)
  })

  poolApi.contract.VaultEventful.rawWeb3Contract
    .VaultCreated({}, { fromBlock: 0 })
    .get((err, data) => data.map(e => console.log(e.args)))
  const randomString = () =>
    Math.random()
      .toString(36)
      .substring(10)
  await poolApi.contract.VaultFactory.createVaultTx(
    randomString(),
    randomString()
  ).send({
    from: accountList[0],
    gas: 4700000,
    gasPrice: 100000000000,
    value: 0
  })
}
;(async () => {
  await test()
})()
