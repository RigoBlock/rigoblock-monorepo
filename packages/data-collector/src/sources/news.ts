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
    const results = response.results.map(res => res.url)
    const getUrls = async () => {
      const urls = []
      const promise = results
        .map((url, index) =>
          launch().then(browser =>
            browser.newPage().then(async page => {
              await page.setUserAgent(
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36'
              )
              await page.goto(url)
              await page.screenshot({ path: `./screenshot${index}.jpeg` })
              const html = await page.content()
              const $ = this.loadHTML(html)
              const sourceUrl = $('h1.post-title a:nth-child(2)').attr('href')
              urls.push(sourceUrl)
              await browser.close()
              await new Promise(resolve => setTimeout(resolve, 1000))
              return
            })
          )
        )
        .reduce((acc, curr) => acc.then(() => curr), Promise.resolve())
      await promise
      console.log(urls)
      return urls
    }
    await getUrls()
  }
}
