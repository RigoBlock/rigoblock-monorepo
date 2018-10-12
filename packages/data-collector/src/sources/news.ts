import { CRYPTO_NEWS_BASE_URL } from '../constants'
import { HtmlResource } from './htmlResource'

export class TokenNews extends HtmlResource {
  constructor() {
    super()
  }
  public async rip(symbol) {
    const response = await this.fetch(CRYPTO_NEWS_BASE_URL + symbol).then(res =>
      res.json()
    )

    console.log(response)
  }
}
