import { Job } from 'bull'
import Web3 from 'web3'
import redis from '@rigoblock/stats/src/redis'
import statsD from '@rigoblock/stats/src/statsd'
import web3ErrorWrapper from '@rigoblock/stats/src/tasks/web3ErrorWrapper'

const task = async (job: Job, web3: Web3) => {
  const { key, network, poolType } = job.data

  const pools = await redis.hgetall(`${key}:${network}`)

  if (!Object.keys(pools).length) {
    return true
  }

  const balances = await Promise.all(
    Object.keys(pools).map(async address => {
      const balance = await web3.eth.getBalance(address)
      return {
        address,
        balance
      }
    })
  )

  const gaugePromises = balances.map(
    pool =>
      new Promise((resolve, reject) => {
        statsD.gauge(
          `${poolType}.${pool.address}.${network}.balance.ETH`,
          pool.balance,
          (error, bytes) => (error ? reject(error) : resolve(bytes))
        )
      })
  )

  return Promise.all(gaugePromises)
}

export default web3ErrorWrapper(task)
