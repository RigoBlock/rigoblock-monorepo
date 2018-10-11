import { HtmlResource } from './htmlResource'
import tokensMap from '../tokensMap'

export class TokenOverview extends HtmlResource {
  private $: CheerioStatic
  constructor() {
    super()
  }
  public async rip(symbol) {
    const html = await this.fetch(tokensMap[symbol].overviewUrl)
    this.$ = this.loadHTML(html)
    return {
      whitepaper: this.whitePaperUrl,
      website: this.websiteUrl,
      status: this.status,
      blockchain: this.blockChain,
      team: this.team,
      countryOfOrigin: this.countryOfOrigin,
      tokensSaleDate: this.tokenSaleDate,
      articles: this.articles,
      github: {
        url: this.githubUrl,
        stats: this.githubStats
      }
    }
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
  private get articles() {
    return this.$('table.asset-list-research tr a')
      .toArray()
      .map(el => {
        return {
          name: this.normalizeText(el.children.pop().data),
          url: el.attribs.href
        }
      })
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
      .reduce(
        (acc, curr) => [
          ...acc,
          ...curr.children.filter(
            child => child.name === 'th' || child.name === 'td'
          )
        ],
        []
      )
      .map(el => this.normalizeText(el.children.pop().data))
    // .map(el => {
    //   console.log(el.children.length)
    //   // return {
    //   //   type: el.children.shift(),
    //   //   data: el.children.shift()
    //   // }
    // })
  }
}
