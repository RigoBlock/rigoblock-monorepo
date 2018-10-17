import { INFO_DB, NEWS_DB } from './constants'
import db from './db'

const emit = (a, b) => {}

const initDatabase = async () => {
  const view = {
    views: {
      by_symbol_and_date: {
        map: function(doc) {
          if (doc.date && doc.token) {
            emit([doc.token, doc.date], doc._id)
          }
        }
      }
    }
  }
  await db.init()
  await db.createDb(INFO_DB)
  await db.createDb(NEWS_DB)
  await db.upsert(NEWS_DB, '_design/news', view)
}

initDatabase()
