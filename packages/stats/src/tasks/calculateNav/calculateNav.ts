import Web3 = require('web3')
import fetchContracts from '@rigoblock/contracts'
import redis from '../../redis'
import statsD from '../../statsd'
import web3ErrorWrapper from '../web3ErrorWrapper'

// TODO: insert correct algorithm to calculate the fund's NAV
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

  const navPromises = sharePrices.map(
    pool =>
      new Promise((resolve, reject) => {
        statsD.gauge(
          `${poolType}.${pool.address}.price,network=${network},price_type=nav`,
          pool.buyPrice,
          (error, bytes) => (error ? reject(error) : resolve(bytes))
        )
      })
  )

  return Promise.all(navPromises)
}

export default web3ErrorWrapper(task)
