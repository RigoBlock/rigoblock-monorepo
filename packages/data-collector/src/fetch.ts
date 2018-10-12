import { TokenOverview } from './sources/overview'

const getData = async () => {
  const news = new TokenOverview()
  news.rip('ZRX')
}

getData()
