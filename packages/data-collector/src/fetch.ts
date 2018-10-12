import { TokenNews } from './sources/news'
import { TokenOverview } from './sources/overview'
import { TokenSocial } from './sources/social'

const getData = async () => {
  // const news = new TokenOverview()
  // news.rip('ZRX')
  const asd = new TokenNews()
  asd.rip('ZRX')
}

getData()
