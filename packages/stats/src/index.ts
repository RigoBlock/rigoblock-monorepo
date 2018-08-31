import config, { ConfigEntry } from './config'
import initQueue from './initQueue'
import logger from './logger'

logger.info(`Creating queues...`)

const queues = Object.keys(config).map(queueName => {
  const queueConf: ConfigEntry = config[queueName]
  return initQueue(
    queueName,
    queueConf.handlerName,
    queueConf.cronExpression,
    queueConf.initialData
  )
})

logger.info(`Created ${queues.length} queues`)
