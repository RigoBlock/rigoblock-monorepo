import * as Redis from 'ioredis'
import { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } from './constants'

const config: Redis.RedisOptions = {
  host: REDIS_HOST,
  port: REDIS_PORT
}

if (REDIS_PASSWORD) {
  config.password = REDIS_PASSWORD
}

export default new Redis(config)
