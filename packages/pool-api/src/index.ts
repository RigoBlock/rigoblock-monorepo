import PoolsApi from './api'

const api = async () => {
  const test = new PoolsApi()
  await test.init()

  console.log(test.contract)
}
;(async () => {
  await api()
})()
