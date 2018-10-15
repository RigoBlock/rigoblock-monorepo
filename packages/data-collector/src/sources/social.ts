import { HtmlResource } from './htmlResource'

export class TokenSocial extends HtmlResource {
  constructor() {
    super()
  }
  public async rip(symbol) {
    const tokensList = await this.fetch(
      'https://www.cryptocompare.com/api/data/coinlist/'
    ).then(res => res.json())
    const tokenId = tokensList.Data[symbol].Id
    const socialData = await this.fetch(
      `https://www.cryptocompare.com/api/data/socialstats/?id=${tokenId}`
    ).then(res => res.json())
    const { Reddit, Twitter, Facebook } = socialData.Data
    return {
      facebook: Facebook,
      twitter: Twitter,
      reddit: Reddit
    }
  }
}