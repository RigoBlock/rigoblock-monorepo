import logger from '../../logger'

const task = async job => {
  console.log('test')
  logger.info('test - logger')
}

export default task
