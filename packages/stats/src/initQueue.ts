import * as Queue from 'bull'
import * as constants from './constants'
import tasks from './tasks'

export default (
  name: string,
  handlerName: string,
  cronExpression: string,
  initialData: object = {}
) => {
  const config: Queue.QueueOptions = {
    redis: {
      host: constants.REDIS_HOST,
      port: constants.REDIS_PORT
    }
  }
  if (constants.REDIS_PASSWORD) {
    config.redis.password = constants.REDIS_PASSWORD
  }

  const queue = new Queue(name, config)

  queue.process(tasks[handlerName])

  queue.add(initialData, { repeat: { cron: cronExpression } })

  return queue
}
