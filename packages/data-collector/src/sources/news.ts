import * as moment from 'moment'
import { CRYPTO_NEWS_BASE_URL } from '../constants'
import { HtmlResource } from './htmlResource'
import { launch } from 'puppeteer'
import tokensMap from '../tokensMap'

export class TokenNews extends HtmlResource {
  private $: CheerioStatic
  private browser: any
  private news: any[] = []
  constructor() {
    super()
  }
  public async rip(symbol) {
    const response = await this.fetch(CRYPTO_NEWS_BASE_URL + symbol).then(res =>
      res.json()
    )
    this.browser = await launch()
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
    const html = await this.fetch(tokensMap[symbol].overviewUrl).then(res =>
      res.text()
    )
    this.$ = this.loadHTML(html)
    const otherNews = this.articles
    return [...this.news, ...otherNews]
  }
  public async getUrl(article) {
    const { url, title, date } = article
    const page = await this.browser.newPage()
    await page.setUserAgent('Chrome')
    await page.goto(url)
    const html = await page.content()
    await page.close()
    const $ = this.loadHTML(html)
    const sourceUrl = $('h1.post-title a:nth-child(2)').attr('href')
    return this.news.push({ title, url: sourceUrl, date })
  }
  private get articles() {
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
