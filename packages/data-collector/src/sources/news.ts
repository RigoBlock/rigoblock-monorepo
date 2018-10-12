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
      // console.log(res.url)
    })
    const browser = await launch({
      // headless: false
      slowMo: 100
    })
    const page = await browser.newPage()
    await page.setViewport({ width: 1980, height: 1020 })
    await page.goto(
      'https://cryptopanic.com/news/3315075/0x-Token-Listed-on-Coinbase-Pro-Exchange',
      { waitUntil: 'networkidle0' }
    )

    await page.screenshot({ path: './screenshot.jpeg', type: 'jpeg' })
    const html = await page.content()
    await page.url()
    await page.waitFor(2000)
    await page.screenshot({ path: './screenshot2.jpeg', type: 'jpeg' })
    // browser.close()
    const $ = this.loadHTML(html)
    const asd = $('h1.post-title').text()
    console.log(asd)
    // console.log(results)

    // return {
    //   news: response.results
    // }
  }
}
