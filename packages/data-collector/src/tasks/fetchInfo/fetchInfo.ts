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
  const currentDate = moment().format('YYYY-MM-DD')
  await db.init()
  await db.upsert(INFO_DB, `${symbol}::${currentDate}`, info)
  return
}

export default task
