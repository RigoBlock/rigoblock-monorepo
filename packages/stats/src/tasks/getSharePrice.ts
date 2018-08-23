import * as Web3 from 'web3'
import { Job } from 'bull'
import { NETWORKS } from '../constants'
import protocol from '@rigoblock/protocol'
import redis from '../redis'
import statsD from '../statsd'

const anyWeb3: any = Web3

const task = async (job: Job) => {
  const { key, network, web3Provider, poolType } = job.data
  const web3 = new anyWeb3(
    new anyWeb3.providers.WebsocketProvider(web3Provider)
  )
  const contractsMap = await protocol(NETWORKS.KOVAN)
  const pools = await redis.hgetall(`${key}:${network}`)
  const poolAbi = contractsMap[poolType].abi

  const sharePrices = await Promise.all(
    Object.keys(pools).map(async address => {
      const contract = new web3.eth.Contract(poolAbi, address)
      const poolData = await contract.methods.getData().call()
      const { buyPrice, sellPrice } = poolData
      return {
        address,
        buyPrice,
        sellPrice
      }
    })
  )

  const buyPricePromises = sharePrices.map(
    pool =>
      new Promise((resolve, reject) => {
        statsD.gauge(
          `${poolType}.${pool.address}.${network}.price.buyprice`,
          pool.buyPrice,
          (error, bytes) => (error ? reject(error) : resolve(bytes))
        )
      })
  )

  const sellPricePromises = sharePrices.map(
    pool =>
      new Promise((resolve, reject) => {
        statsD.gauge(
          `${poolType}.${pool.address}.${network}.price.sellprice`,
          pool.sellPrice,
          (error, bytes) => (error ? reject(error) : resolve(bytes))
        )
      })
  )

  return Promise.all(buyPricePromises.concat(sellPricePromises))
}

export default task
