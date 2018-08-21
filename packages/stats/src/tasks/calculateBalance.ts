import redis from '../redis'

const task = async () => {
  const vaults = await redis.smembers('vaults')
  return console.log(vaults)
}

export default task
