import { CRYPTO_NEWS_BASE_URL } from '../constants'
import { HtmlResource } from './htmlResource'
import { launch } from 'puppeteer'

export class TokenNews extends HtmlResource {
  private browser: any
  private newsUrls: string[] = []
  constructor() {
    super()
  }
  public async rip(symbol) {
    const response = await this.fetch(CRYPTO_NEWS_BASE_URL + symbol).then(res =>
      res.json()
    )
    const urls = response.results.map(res => res.url)
    this.browser = await launch()
    const promiseChain = urls.reduce(
      (acc, curr) => acc.then(() => this.getUrl(curr)),
      Promise.resolve()
    )
    await promiseChain
    await this.browser.close()
    console.log(this.newsUrls)
    return {
      news: this.newsUrls
    }
  }
  public async getUrl(url) {
    const page = await this.browser.newPage()
    await page.setUserAgent('Chrome')
    await page.goto(url)
    const html = await page.content()
    await page.close()
    const $ = this.loadHTML(html)
    const sourceUrl = $('h1.post-title a:nth-child(2)').attr('href')
    return this.newsUrls.push(sourceUrl)
  }
}
