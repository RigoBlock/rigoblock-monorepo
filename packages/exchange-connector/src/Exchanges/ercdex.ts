import * as Exchange from './exchange'
import { getRequestOptions } from '../utils'
import fetch from 'node-fetch'

export class ERCdEX implements Exchange.Interface<ERCdEX> {
  private HTTP_API_URL = 'https://api.ercdex.com/api'

  constructor(public networkId, public transport) {}

  public async getOrders(
    baseSymbol: string,
    quoteSymbol: string
  ): Promise<Exchange.OrdersList> {
    const ordersUrl = `${this.HTTP_API_URL}/aggregated_orders`
    const qs = {
      baseTokenAddress: baseSymbol,
      quoteTokenAddress: quoteSymbol,
      networkId: this.network
    }
    return fetch(getRequestOptions(ordersUrl, qs)).then(r => r.json())
  }

  public network(id: number): ERCdEX {
    this.networkId = id
    return this
  }
}
