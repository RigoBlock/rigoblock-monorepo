import { TokenOverview } from '../../sources/overview'
import { TokenSocial } from '../../sources/social'
import db from '../../db'

const task = async job => {
  // const { symbol } = job.data
  // const overview = await new TokenOverview().rip(symbol)
  // const social = await new TokenSocial().rip(symbol)
  // const value = { symbol, ...overview, ...social }
  const prova = {
    hello: 'world'
  }
  await db.init()
  // await db.upsert('testdb')
  // return value
}

export default task
