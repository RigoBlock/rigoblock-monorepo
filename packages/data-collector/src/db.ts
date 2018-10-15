import * as Nano from 'nano'
import {
  COUCHDB_HOST,
  COUCHDB_PASSWORD,
  COUCHDB_PORT,
  COUCHDB_USERNAME
} from './constants'

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
      url: `${this.host}:${this.port}`
    })

    return this.conn.auth(this.username, this.password)
  }

  get(dbName: string, key: string) {
    return this.conn.use(dbName).get(key)
  }

  async exists(dbName: string, key: string): Promise<boolean> {
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
    return this.conn.use(dbName).insert({ _id: documentId, ...doc, ...data })
  }
}

export default new Db()
