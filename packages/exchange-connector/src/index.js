// Copyright 2017 Rigo Investment Sagl.
// This file is part of RigoBlock.

import * as http from './exchanges'
import { SupportedExchanges } from './const'
import * as FORMAT from './format'
import rp from 'request-promise'
import { ERCdEX, Ethfinex } from '../../const';

class Exchange {
  constructor(exchange, network = '1', transport = 'http') {
    if (typeof SupportedExchanges[exchange] === 'undefined') {
      throw new Error('Exchange not supported: ' + exchange)
    }
    if (!SupportedExchanges[exchange].supportedNetworks.includes(network)) {
      throw new Error('Network not supported on this exchange: ' + network)
    }
    this._exchange = exchange
    this._network = network
    this._transport = transport
    this._exchangeProperties = SupportedExchanges[exchange]
    this._call = {
      http,
      ws: 'ws'
    }
  }

  returnResults = (query, formatFunction = (input) => { return input }) => {
    return rp(query())
      .then(results => {
        console.log(results)
        console.log(formatFunction)
        console.log(formatFunction(results))
        return formatFunction(results)
      })
      .catch(err => {
        return err
      })
  }

  getAggregatedOrders = (baseToken, quoteToken) => {
    console.log(`Fetching aggregated orders from ${this._exchange}`)
    if (!baseToken) {
      throw new Error('baseToken needs to be set')
    }
    if (!quoteToken) {
      throw new Error('quoteToken needs to be set')
    }
    return this.returnResults(() => {
      switch (this._exchange) {
        case ERCdEX:
          return this._call[this._transport].getAggregatedOrders[this._exchange](this._network, baseToken.address, quoteToken.address)
        case Ethfinex:
          return this._call[this._transport].getAggregatedOrders[this._exchange](this._network, baseToken.symbol, 'ETH')
        default:
          throw new Error('Relay unknown')
      }
    }, FORMAT.aggregatedOrders[this._exchange]
    )
  }

  getTickers = () => {
    console.log(`Fetching tokens prices from ${this._exchange}`)
    return this.returnResults(() => {
      return this._call[this._transport].getTickers[this._exchange](this._network, this._exchangeProperties.tickersTokenPairs)
    }, FORMAT.tickers[this._exchange])
  }
}

export default Exchange