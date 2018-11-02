import * as moment from 'moment'
import { PRICES_DB } from './../../constants'
import { TokenPrice } from '../../sources/price'
import db from '../../db'
import logger from '../../logger'

const task = async job => {
  const { symbol, networkId } = job.data
  await db.init()
  const tokenPrice = new TokenPrice()
  const currentDate = moment()
    .utcOffset(0)
    .startOf('day')
    .toISOString()
  const prevDay = moment(currentDate)
    .subtract('1', 'day')
    .toISOString()
  let conflicts = []
  const oldData = await db.get(PRICES_DB, prevDay)

  const candles = await tokenPrice.fetch(symbol, networkId)
  if (Array.isArray(candles) && <any>candles[0] === 'error') {
    return logger.error(candles[2])
  }

  if (oldData && oldData[networkId] && oldData[networkId].candles) {
    const oldCandles = oldData[networkId].candles
    const diff = tokenPrice.compareData(oldCandles, candles)
    conflicts = diff.length ? diff : conflicts
  }
  const prices = {
    [networkId]: {
      conflicts,
      candles
    }
  }

  return db.upsert(PRICES_DB, `${symbol}::${currentDate}`, prices)
}

export default task
