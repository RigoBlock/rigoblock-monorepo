import { HtmlResource } from './htmlResource'
import { OVERVIEW_URL } from '../constants'
import { launch } from 'puppeteer'
import tokensMap from '../tokensMap'

export class TokenOverview extends HtmlResource {
  private $: CheerioStatic
  constructor() {
    super()
  }
  public async rip(symbol) {
    let html = await this.fetchText(tokensMap[symbol].overviewUrl)
    this.$ = this.loadHTML(html)
    const overview = {
      whitepaper: this.whitePaperUrl,
      website: this.websiteUrl,
      status: this.status,
      blockchain: this.blockChain,
      team: this.team,
      countryOfOrigin: this.countryOfOrigin,
      tokensSaleDate: this.tokenSaleDate,
      github: {
        url: this.githubUrl,
        stats: this.githubStats
      }
    }
    const browser = await launch({ args: ['--no-sandbox'] })
    const page = await browser.newPage()
    await page.goto(OVERVIEW_URL(symbol))
    html = await page.content()
    browser.close()
    this.$ = this.loadHTML(html)
    const description = await this.$('div.coin-description p').text()
    return { ...overview, description }
  }
  private get whitePaperUrl() {
    return this.$('a[title=Whitepaper]').attr('href')
  }
  private get websiteUrl() {
    return this.$('a.visit-website').attr('href')
  }
  private get blockChain() {
    return this.normalizeText(
      this.$('table.asset-overview-table > tbody a')
        .last()
        .text()
    )
  }
  private get status() {
    return this.normalizeText(this.$('span.asset-status').text())
  }
  private get team() {
    return this.$('div.team-section-wrapper > table tr:first-child')
      .find('p')
      .toArray()
      .map(el => {
        const teamMember = this.normalizeText(el.children.pop().data)
        return teamMember.split(' - ')
      })
      .reduce(
        (acc, curr, index) => ({
          ...acc,
          [index]: { name: curr.shift(), title: curr.shift() }
        }),
        {}
      )
  }
  private get countryOfOrigin() {
    return this.normalizeText(
      this.$('div.team-section-wrapper > table tr:last-child')
        .find('td')
        .text()
    )
  }
  private get tokenSaleDate() {
    return this.$('div.dates-wrapper span')
      .toArray()
      .map(el => this.normalizeText(el.children.pop().data))
  }
  private get githubUrl() {
    return this.$('div.technology-section-wrapper h3')
      .last()
      .find('a')
      .attr('href')
  }
  private get githubStats() {
    return this.$('.asset-list-github tr')
      .toArray()
      .reduce((acc, curr, index) => {
        const elements = curr.children.filter(
          child => child.name === 'th' || child.name === 'td'
        )
        const type = this.normalizeText(elements.shift().children.pop().data)
        const data = this.normalizeText(elements.shift().children.pop().data)
        return { ...acc, [index]: { type, data } }
      }, {})
  }
}
