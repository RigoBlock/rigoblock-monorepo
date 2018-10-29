import * as Nano from 'nano'
import * as u from 'updeep'
import {
  COUCHDB_HOST,
  COUCHDB_PASSWORD,
  COUCHDB_PORT,
  COUCHDB_USERNAME
} from './constants'
import logger from './logger'

export class Db {
  public conn: Nano.ServerScope

  constructor(
    public host = COUCHDB_HOST,
    public port = COUCHDB_PORT,
    public username = COUCHDB_USERNAME,
    public password = COUCHDB_PASSWORD
  ) {}

  init() {
    this.conn = Nano({
      url: `${this.host}:${this.port}`,
      requestDefaults: { jar: true }
    })

    return this.conn.auth(this.username, this.password)
  }

  async get(dbName: string, key?: string) {
    let result
    try {
      result = await this.conn.use(dbName).get(key)
    } catch (e) {
      return e.message !== 'missing' ? logger.error(e) : null
    }
    return result
  }

  async createDb(dbName) {
    const dbExists = await this.exists(dbName)
    return dbExists
      ? Promise.resolve(console.log(`Database already exists: ${dbName}`))
      : this.conn.db.create(dbName)
  }

  async exists(dbName: string, key?: string): Promise<boolean> {
    try {
      await this.conn.use(dbName).head(key)
      return true
    } catch (_) {
      return false
    }
  }

  async find(dbName: string, query: Nano.MangoQuery) {
    const res = await this.conn.use(dbName).find(query)
    return res.docs
  }

  async upsert(dbName: string, documentId: string, data) {
    const exists = await this.exists(dbName, documentId)

    let doc = {}
    if (exists) {
      doc = await this.get(dbName, documentId)
    }
    const value = u(doc, data)
    return this.conn.use(dbName).insert({ _id: documentId, ...value })
  }

  async createIndex(dbName, indexDef) {
    const db = this.conn.use(dbName)
    return (db as any).createIndex(indexDef)
  }
}

export default new Db()
