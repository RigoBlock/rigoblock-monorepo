import { Job } from 'bull'
import { resolve } from 'dns'
import logger from '../logger'
import statsD from '../statsd'

const task = (job: Job<any>) => {
  logger.info('inside the job')
  return new Promise((resolve, reject) => {
    statsD.gauge(
      `vault.0.balance`,
      5000,
      (error, bytes) => (error ? reject(error) : resolve(bytes))
    )
  })
}

export default task
