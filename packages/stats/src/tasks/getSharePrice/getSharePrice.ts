import Web3 = require('web3')
import fetchContracts from '@rgbk/contracts'
import redis from '../../redis'
import statsD from '../../statsd'
import web3ErrorWrapper from '../web3ErrorWrapper'

const task = async (job, web3: Web3) => {
  const { key, network, poolType } = job.data
  const contractsMap = await fetchContracts(network)
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
          `${poolType}.${pool.address}.price,network=${network},price_type=buy`,
          pool.buyPrice,
          (error, bytes) => (error ? reject(error) : resolve(bytes))
        )
      })
  )

  const sellPricePromises = sharePrices.map(
    pool =>
      new Promise((resolve, reject) => {
        statsD.gauge(
          `${poolType}.${
            pool.address
          }.price,network=${network},price_type=sell`,
          pool.sellPrice,
          (error, bytes) => (error ? reject(error) : resolve(bytes))
        )
      })
  )

  return Promise.all(buyPricePromises.concat(sellPricePromises))
}

export default web3ErrorWrapper(task)
