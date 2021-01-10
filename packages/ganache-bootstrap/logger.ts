import { pino } from 'pino'

const loggerOpts = {
  prettyPrint: true,
  timestamp: false
}

export default pino(loggerOpts)
