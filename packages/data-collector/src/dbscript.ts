import { INFO_DB, NEWS_DB } from './constants'
import db from './db'

const initDatabase = async () => {
  await db.init()
  await db.createDb(INFO_DB)
  await db.createDb(NEWS_DB)
}

initDatabase()
