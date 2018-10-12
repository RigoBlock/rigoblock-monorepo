import { TokenNews } from './sources/news'

const getData = async () => {
  const news = new TokenNews()
  news.rip('ZRX')
}

getData()
