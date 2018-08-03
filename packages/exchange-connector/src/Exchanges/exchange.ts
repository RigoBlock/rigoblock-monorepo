export default interface IExchange {
  getTickers (options: {
    networkId?: string,
    tokenPairs?: string[]
  }) : string
  getAggregatedOrders (baseToken: {
    symbol:string,
    address?: string
  }) : Promise<number[][] | object>
  formatAggregatedOrders(orders: Array<number[] | object>) : {
    bids: object[]
    asks: object[]
    spread: string
    aggregated: boolean
  }
}
