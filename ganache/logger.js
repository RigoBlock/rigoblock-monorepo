const pino = require('pino')
const loggerOpts = {
  prettyPrint: true,
  timestamp: false
}

module.exports = pino(loggerOpts)
