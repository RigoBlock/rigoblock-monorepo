import { INFO_DB, NEWS_DB } from './constants'
import db from './db'

const initDatabase = async () => {
  const view = {
    views: {
      by_symbol_and_date: {
        map:
          "function (doc) { const [symbol, date ] = doc._id.split('::'); emit([symbol, date], doc)}"
      }
    }
  }
  const indexDef = {
    index: {
      fields: [
        {
          date: 'asc'
        }
      ]
    },
    name: 'tokens-news-date'
  }
  await db.init()
  await db.createDb(INFO_DB)
  await db.createDb(NEWS_DB)
  await db.upsert(INFO_DB, '_design/info', view)
  await db.createIndex(NEWS_DB, indexDef)
}

initDatabase()
