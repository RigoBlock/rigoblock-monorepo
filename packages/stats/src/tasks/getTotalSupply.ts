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
          `${poolType}.${pool.address}.totalsupply.${network}`,
          pool.totalSupply,
          (error, bytes) => (error ? reject(error) : resolve(bytes))
        )
      })
  )

  return Promise.all(gaugePromises)
}

export default task
