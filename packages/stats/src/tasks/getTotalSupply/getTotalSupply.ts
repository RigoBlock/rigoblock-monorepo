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

  const supplyTotals = await Promise.all(
    Object.keys(pools).map(async address => {
      const contract = new web3.eth.Contract(poolAbi, address)
      const totalSupply = await contract.methods.totalSupply().call()
      return {
        address,
        totalSupply
      }
    })
  )

  const gaugePromises = supplyTotals.map(
    pool =>
      new Promise((resolve, reject) => {
        statsD.gauge(
          `${poolType}.${pool.address}.totalsupply,network=${network}`,
          pool.totalSupply,
          (error, bytes) => (error ? reject(error) : resolve(bytes))
        )
      })
  )

  return Promise.all(gaugePromises)
}

export default web3ErrorWrapper(task)
