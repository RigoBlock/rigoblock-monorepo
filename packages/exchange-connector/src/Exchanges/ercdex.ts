import * as rp from 'request-promise'
import { getRequestOptions } from '../utils'
import Exchange from './exchange'

const HTTP_API_URL = 'https://api.ercdex.com/api'

export class ERCdEX implements Exchange {
  constructor(public network, public transport) {
  }
  public getAggregatedOrders = (baseToken, quoteToken) => {
    const ordersUrl = `${HTTP_API_URL}/aggregated_orders`
    const qs = {
      baseTokenAddress: baseToken.address,
      quoteTokenAddress: quoteToken.address,
      networkId: this.network
    }
    return rp(getRequestOptions(ordersUrl, qs))
  }

  public getTickers = () => {}

  private formatAggregatedOrders = () => {}
}

