import { Job } from 'bull'
import logger from '../logger'

const task = async (job: Job<any>) => {
  return logger.info('test - logger')
}

export default task
