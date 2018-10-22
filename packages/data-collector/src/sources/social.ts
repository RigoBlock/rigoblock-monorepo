import { HtmlResource } from './htmlResource'
import { SOCIAL_URL, TOKENS_LIST_URL } from '../constants'

export class TokenSocial extends HtmlResource {
  constructor() {
    super()
  }
  public async rip(symbol) {
    const tokensList = await this.fetchJSON(TOKENS_LIST_URL)
    const tokenId = tokensList.Data[symbol].Id
    const socialData = await this.fetchJSON(SOCIAL_URL(tokenId))
    const { Reddit, Twitter, Facebook } = socialData.Data
    return {
      facebook: Facebook,
      twitter: Twitter,
      reddit: Reddit
    }
  }
}
