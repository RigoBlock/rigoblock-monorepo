import { NEWS_DB } from '../../constants'
import { TokenNews } from '../../sources/news'
import db from '../../db'

const task = async job => {
  const { symbol } = job.data
  const news = await new TokenNews().rip(symbol)
  await db.init()
  if (!news.length) {
    return null
  }
  const upsertPromises = news
    .filter(el => el.url)
    .map(async el =>
      db.upsert(NEWS_DB, el.url, {
        title: el.title,
        token: symbol,
        date: el.date
      })
    )
  return Promise.all(upsertPromises)
}

export default task
