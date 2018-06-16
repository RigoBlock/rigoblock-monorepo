const pino = require('pino')

const loggerOpts = {
  prettyPrint: true,
  timestamp: false
}

if (process.env.NODE_ENV === 'test') loggerOpts.level = 'silent'

module.exports = pino(loggerOpts)
