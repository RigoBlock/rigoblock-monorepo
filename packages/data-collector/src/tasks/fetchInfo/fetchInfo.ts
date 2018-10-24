import * as moment from 'moment'
import { INFO_DB } from '../../constants'
import { TokenOverview } from '../../sources/overview'
import { TokenSocial } from '../../sources/social'
import db from '../../db'

const task = async job => {
  const { symbol } = job.data
  const overview = await new TokenOverview().rip(symbol)
  const social = await new TokenSocial().rip(symbol)
  const info = {
    symbol,
    ...overview,
    ...social
  }
  const currentDate = moment()
    .utcOffset(0)
    .startOf('day')
    .toISOString()
  await db.init()
  return db.upsert(INFO_DB, `${symbol}::${currentDate}`, info)
}

export default task
