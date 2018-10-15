import { CRYPTO_NEWS_BASE_URL } from '../constants'
import { HtmlResource } from './htmlResource'
import { launch } from 'puppeteer'

export class TokenNews extends HtmlResource {
  constructor() {
    super()
  }
  public async rip(symbol) {
    const response = await this.fetch(CRYPTO_NEWS_BASE_URL + symbol).then(res =>
      res.json()
    )
    const results = response.results.map(res => {
      console.log(res.slug)
    })
    const browser = await launch()
    const page = await browser.newPage()
    await page.setViewport({ width: 1980, height: 1020 })
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36'
    )
    await page.goto(
      'https://cryptopanic.com/news/3315075/0x-Token-Listed-on-Coinbase-Pro-Exchange'
    )
    const html = await page.content()
    const $ = this.loadHTML(html)
    const asd = $('h1.post-title a:nth-child(2)').attr('href')
    console.log(asd)
  }
}
