import * as StatsD from 'node-statsd'
import { TELEGRAF_HOST, TELEGRAF_PORT } from './constants'

export default new StatsD({
  host: TELEGRAF_HOST,
  port: TELEGRAF_PORT
})
