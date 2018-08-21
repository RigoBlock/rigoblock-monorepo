import logger from '../logger'
import redis from '../redis'
import statsD from '../statsd'

const task = async () => {
  const vaults = await redis.smembers('vaults')
  return console.log(vaults)
}

export default task
