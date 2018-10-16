import { NEWS_DB } from '../../constants'
import { TokenNews } from '../../sources/news'
import db from '../../db'

const task = async job => {
  const { symbol } = job.data
  const news = await new TokenNews().rip(symbol)
  await db.init()
  news.map(async el => {
    await db.upsert(NEWS_DB, el.url, { title: el.title, token: symbol })
  })
  return
}

export default task
