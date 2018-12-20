import { INFO_DB, NEWS_DB, PRICES_DB } from './constants'
import db from './db'

const initDatabase = async () => {
  const validateFunction = {
    validate_doc_update:
      `function(newDoc, oldDoc, userCtx) { var IS_DB_ADMIN = false;` +
      `if (userCtx.roles.indexOf('_admin') !== -1) { IS_DB_ADMIN = true };` +
      `if (IS_DB_ADMIN) { return } else { throw { forbidden: 'This database is read-only' }}}`
  }
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
  await db.createDb(PRICES_DB)
  await db.upsert(INFO_DB, '_design/info', { ...view, ...validateFunction })
  await db.upsert(NEWS_DB, '_design/news', validateFunction)
  await db.upsert(PRICES_DB, '_design/news', validateFunction)
  await db.createIndex(NEWS_DB, indexDef)
}

initDatabase()
