import { Job } from 'bull'
import protocol from '@rigoblock/protocol'
import redis from '../redis'
import statsD from '../statsd'
import web3 from '../web3'

const task = async (job: Job) => {
  const { symbol, address, key, network } = job.data
  const contractsMap = await protocol(network)
  const erc20Abi = contractsMap.ERC20.abi
  const contract = new web3.eth.Contract(erc20Abi, address)
  const pools = await redis.hgetall(key)

  if (!Object.keys(pools).length) {
    return true
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
