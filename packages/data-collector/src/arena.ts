import * as constants from './constants'

import Arena = require('bull-arena')
console.log(Arena)

export default Arena(
  {
    queues: [
      {
        name: 'dummy-task',
        hostId: 'localhost',
        host: 'docker.for.mac.localhost',
        prefix: 'data-collector',
        redis: {
          host: constants.REDIS_HOST,
          port: constants.REDIS_PORT
        }
      }
    ]
  },
  {
    port: 4568
  }
)
