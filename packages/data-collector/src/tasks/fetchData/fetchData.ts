import * as moment from 'moment'
import { TOKEN_DB } from '../../constants'
import { TokenNews } from '../../sources/news'
import { TokenOverview } from '../../sources/overview'
import { TokenSocial } from '../../sources/social'
import db from '../../db'

const task = async job => {
  const { symbol } = job.data
  const overview = await new TokenOverview().rip(symbol)
  const social = await new TokenSocial().rip(symbol)
  const news = await new TokenNews().rip(symbol)
  const value = {
    symbol,
    ...overview,
    ...social,
    ...news
  }
  const currentDate = moment().format('YYYY-MM-DD')
  await db.init()
  await db.upsert(TOKEN_DB, `${symbol}::${currentDate}`, value)
  return
}

export default task
