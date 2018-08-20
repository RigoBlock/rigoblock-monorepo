import { DoneCallback, Job } from 'bull'
import logger from '../logger'

const task = async (job: Job<any>, done: DoneCallback) => {
  console.log('test')
  logger.info('test - logger')
}

export default task
