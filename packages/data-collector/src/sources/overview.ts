import { HtmlResource } from './htmlResource'
import tokensMap from '../tokensMap'

export class TokenOverview extends HtmlResource {
  private $: any
  constructor() {
    super()
  }
  public rip(symbol) {
    const html = this.fetch(tokensMap[symbol].overviewUrl)
    this.$ = this.loadHTML(html)
    return {
      whitepaper: this.whitePaperUrl,
      website: this.websiteUrl,
      status: this.status,
      blockchain: this.blockChain,
      teamData: this.teamData
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
  private get teamData() {
    const teamSection = this.$('div.team-section-wrapper')
      .find('td')
      .toArray()
    const team = teamSection[0].children
      .filter(el => el.name === 'p')
      .map(el => el.children.pop().data.trim())
    const countryOfOrigin = teamSection[1].children.pop().data.trim()
    return {
      team,
      countryOfOrigin
    }
  }
}
