import * as Queue from 'bull'
import * as constants from './constants'
import logger from './logger'
import tasks from './tasks'

export default (
  name: string,
  handlerName: string,
  cronExpression: string,
  delay: number = 0,
  initialData: object = {}
) => {
  const config: Queue.QueueOptions = {
    redis: {
      host: constants.REDIS_HOST,
      port: constants.REDIS_PORT
    },
    prefix: 'data-collector'
  }
  if (constants.REDIS_PASSWORD) {
    config.redis.password = constants.REDIS_PASSWORD
  }

  const queue = new Queue(name, config)

  queue.process(tasks[handlerName])

  queue.on('global:stalled', function(job, progress) {
    logger.warn(`Job ${job} is stalled`)
  })
  queue.on('global:failed', function(jobId, err) {
    logger.error(`Job ${jobId} failed: ${err}`)
  })
  // queue.on('global:completed', function(jobId, result) {
  //   logger.info(`Job ${jobId} completed!${result ? ` Result: ${result}` : ''}`)
  // })

  queue.add(initialData, {
    timeout: 1000 * 60 * 5,
    delay,
    repeat: { cron: cronExpression }
  })

  return queue
}
