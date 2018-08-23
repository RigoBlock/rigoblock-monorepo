import * as Web3 from 'web3'
import { Job } from 'bull'
import { NETWORKS } from '../constants'
import protocol from '@rigoblock/protocol'
import redis from '../redis'
import statsD from '../statsd'

const anyWeb3: any = Web3

const task = async (job: Job) => {
  const { symbol, address, key, network, web3Provider } = job.data
  const web3 = new anyWeb3(
    new anyWeb3.providers.WebsocketProvider(web3Provider)
  )
  const contractsMap = await protocol(NETWORKS.KOVAN)
  const erc20Abi = contractsMap.ERC20.abi
  const contract = new web3.eth.Contract(erc20Abi, address)
  const pools = await redis.hgetall(`${key}:${network}`)

  if (!Object.keys(pools).length) {
    return true
  }

  const balances = await Promise.all(
    Object.keys(pools).map(async address => {
      const balance = await contract.methods.balanceOf(address).call()
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
          `drago.${pool.address}.balance.${symbol}.${network}`,
          pool.balance,
          (error, bytes) => (error ? reject(error) : resolve(bytes))
        )
      })
  )

  return Promise.all(gaugePromises)
}

export default task
