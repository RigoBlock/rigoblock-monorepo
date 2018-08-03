namespace Exchange {
  export enum OrderType {
    BUY,
    SELL
  }

  export type OrdersList = Order[]

  export type Order = {
    type: OrderType
    price: number
    amount: number

    // Number of orders at this price in case the order is an aggregation
    ordersCount?: number
  }

  export interface Interface<T, RawOrder = {}> {
    networkId: number
    HTTP_API_URL: string

    getOrders(baseSymbol: string, quoteSymbol: string): Promise<OrdersList>

    getRawOrders(baseSymbol: string, quoteSymbol: string): Promise<RawOrder[]>

    formatOrders(orders: Array<number[] | object>): OrdersList

    getTickers(options: { networkId?: string; tokenPairs?: string[] }): string

    network(id: number): T
  }
}

export = Exchange
