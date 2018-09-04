export enum OrderType {
  BUY,
  SELL
}

export type Token = {
  address: string
  symbol: string
  decimal: number
  type: 'default'
}

export type OrdersList = Order[]

export type TickersList = Ticker[]

export type Order = {
  type: OrderType
  price: string
  amount: string
  // Number of orders at this price in case the order is an aggregation
  ordersCount?: number
}

export type Ticker = {
  priceEth: string
  priceUsd: string
  symbol: string
}

export type ExchangesMap<T> = {
  [key: string]: T
}

export interface IExchange<
  RawOrder = {},
  RawTicker = {},
  TICKERS_TOKEN_PAIRS = {}
> {
  networkId: number
  API_URL: string

  raw: {
    getOrders(
      baseToken: string,
      quoteToken: string,
      precision?: string
    ): Promise<RawOrder[] | RawOrder>

    getTickers(options: {
      networkId?: string
      granularity?: string
      tokenPairs?: TICKERS_TOKEN_PAIRS
    }): Promise<RawTicker[]>
  }

  getOrders(baseToken: string, quoteToken: string): Promise<OrdersList>

  getTickers(options: {
    networkId?: string
    granularity?: string
    tokenPairs?: TICKERS_TOKEN_PAIRS
  }): Promise<TickersList>

  network(id: number): IExchange
}
