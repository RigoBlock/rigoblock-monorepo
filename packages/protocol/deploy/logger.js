const pino = require('pino')

const loggerOpts = {
  prettyPrint: false,
  timestamp: false
}

// silence deploy logs in tests
if (process.env.NODE_ENV === 'test') {
  loggerOpts.level = 'silent'
}

module.exports = pino(loggerOpts)
