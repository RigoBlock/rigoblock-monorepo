import { TokenNews } from './sources/news'
import { TokenOverview } from './sources/overview'
import { TokenSocialData } from './sources/socialData'

const getData = async () => {
  // const news = new TokenOverview()
  // news.rip('ZRX')
  const asd = new TokenSocialData()
  asd.rip('ZRX')
}

getData()
