const pino = require('pino')

const loggerOpts = {
  prettyPrint: true,
  timestamp: false
}

// silence deploy logs in tests
if (process.env.NODE_ENV === 'test') {
  loggerOpts.prettyPrint = false
  loggerOpts.level = 'silent'
}

module.exports = pino(loggerOpts)
