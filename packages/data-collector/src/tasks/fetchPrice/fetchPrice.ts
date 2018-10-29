import * as moment from 'moment'
import { PRICES_DB } from './../../constants'
import { TokenPrice } from '../../sources/price'
import db from '../../db'
import logger from '../../logger'

const task = async job => {
  const { symbol, networkId } = job.data
  const tokenPrice = new TokenPrice()
  const currentDate = moment()
    .zone(0)
    .startOf('day')
    .toISOString()
  const prevDay = moment(currentDate)
    .subtract('1', 'day')
    .toISOString()
  let oldData
  let conflicts = []

  try {
    oldData = await db.get(PRICES_DB, `${symbol}::${prevDay}`)
  } catch (e) {
    logger.error(e)
  }
  const candles = await tokenPrice.fetch(symbol, networkId)
  if (oldData) {
    const diff = tokenPrice.compareData(oldData, candles)
    conflicts = diff.length ? diff : conflicts
  }
  const prices = {
    networkId: {
      conflicts,
      candles
    }
  }

  return db.upsert(PRICES_DB, `${symbol}::${currentDate}`, prices)
}

export default task
