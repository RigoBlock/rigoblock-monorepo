import * as ERC20 from '../../../protocol/artifacts/ERC20.json'
import { Job } from 'bull'
import redis from '../redis'
import statsD from '../statsd'
import web3 from '../web3'

const task = async (job: Job) => {
  const { symbol, address, key } = job.data
  const abi = ERC20.networks['42'].abi
  const contract = new web3.eth.Contract(abi, address)
  const pools = await redis.hgetall(key)

  if (!Object.keys(pools).length) {
    return []
  }

  const balancePromises = Object.keys(pools).map(async address => {
    const balance = await contract.methods.balanceOf(address).call()
    return {
      address,
      balance
    }
  })

  const balances = await Promise.all(balancePromises)

  const gaugePromises = balances.map(pool => {
    return new Promise((resolve, reject) => {
      statsD.gauge(
        `drago.${pool.address}.balance.${symbol}`,
        pool.balance,
        (error, bytes) => (error ? reject(error) : resolve(bytes))
      )
    })
  })
  return Promise.all(gaugePromises)
}

export default task
