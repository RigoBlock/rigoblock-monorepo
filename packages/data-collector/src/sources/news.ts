import * as moment from 'moment'
import { CRYPTO_NEWS_BASE_URL } from '../constants'
import { HtmlResource } from './htmlResource'
import { launch } from 'puppeteer'
import tokensMap from '../tokensMap'

export class TokenNews extends HtmlResource {
  private symbol: string
  private $: CheerioStatic
  private browser: any
  private news: any[] = []
  constructor() {
    super()
  }
  public async rip(symbol) {
    this.symbol = symbol
    await this.fetchCryptoPanicNews()
    const tokenMarketNews = await this.fetchTokenMarketNews()
    return [...this.news, ...tokenMarketNews]
  }
  private async fetchCryptoPanicNews() {
    let response = await this.fetch(CRYPTO_NEWS_BASE_URL + this.symbol).then(
      res => res.json()
    )
    this.browser = await launch()
    if (!response.results.length) {
      return []
    }
    const promiseChain = response.results
      .map(res => ({
        url: res.url,
        title: res.title,
        date: moment(res.published_at).format('x')
      }))
      .reduce(
        (acc, curr) => acc.then(() => this.getUrl(curr)),
        Promise.resolve()
      )
    await promiseChain
    await this.browser.close()
    return this.news
  }
  private async getUrl(article) {
    const page = await this.browser.newPage()
    await page.setUserAgent('Chrome')
    await page.goto(article.url)
    const html = await page.content()
    await page.close()
    const $ = this.loadHTML(html)
    const sourceUrl = $('h1.post-title a.close-button')
      .next()
      .attr('href')
    return this.news.push({ ...article, url: sourceUrl })
  }
  private async fetchTokenMarketNews() {
    const html = await this.fetch(tokensMap[this.symbol].overviewUrl).then(
      res => res.text()
    )
    this.$ = this.loadHTML(html)
    return this.$('div.about-section-wrapper table.asset-list-news td p')
      .toArray()
      .map(el => {
        const title = this.$(el)
          .find('a')
          .text()
          .trim()
        const url = this.$(el)
          .find('a')
          .attr('href')
        const time = this.$(el)
          .find('.text-muted')
          .text()
          .trim()
          .split(' ')
        return {
          title,
          url,
          date: moment()
            .subtract(<any>time[0], time[1])
            .format('x')
        }
      })
  }
}
