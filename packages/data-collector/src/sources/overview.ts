import { HtmlResource } from './htmlResource'
import tokensMap from '../tokensMap'

export class TokenOverview extends HtmlResource {
  constructor() {
    super()
  }
  public rip(symbol) {
    const html = this.fetch(tokensMap[symbol].overviewUrl)
    const $ = this.loadHTML(html)
    const whitepaper = this.whitePaperLink($)
    const teamData = this.teamData($)
  }
  private whitePaperLink($) {
    return $('a[title=Whitepaper]').attr('href')
  }
  private teamData($) {
    const teamSection = $('div.team-section-wrapper')
      .find('td')
      .toArray()
    const teamList = teamSection[0].children
      .filter(el => el.name === 'p')
      .map(el => el.children.pop().data.trim())
    const countryOfOrigin = teamSection[1].children.pop().data.trim()
    return {
      teamList,
      countryOfOrigin
    }
  }
}
