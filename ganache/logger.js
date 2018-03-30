const pino = require('pino')
const loggerOpts = {
  prettyPrint: true
}

module.exports = pino(loggerOpts)
