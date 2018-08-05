// Copyright 2017 Rigo Investment Sagl.
// This file is part of RigoBlock.

import * as FORMAT from './format'
import * as http from './exchanges'
import * as ws from './exchangesWs'
import { ERCdEX, Ethfinex } from './const'
import { SupportedExchanges } from './const'
import rp from 'request-promise'

class Exchange {
  constructor(exchange = Ethfinex, network = '1', transport = 'http') {
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
      ws
    }
  }

  returnResults = (
    query,
    formatFunction = input => {
      return input
    }
  ) => {
    switch (this._transport) {
      case 'ws':
        return query()
      case 'http':
        return rp(query())
          .then(results => {
            // console.log(results)
            // console.log(formatFunction)
            // console.log(formatFunction(results))
            return formatFunction(results)
          })
          .catch(err => {
            return err
          })
      default:
        throw new Error('Transport unknown')
    }
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
          return this._call[this._transport].getAggregatedOrders[
            this._exchange
          ](this._network, baseToken, quoteToken)
        case Ethfinex:
          return this._call[this._transport].getAggregatedOrders[
            this._exchange
          ](this._network, baseToken, quoteToken)
        default:
          throw new Error('Relay unknown')
      }
    }, FORMAT.aggregatedOrders[this._exchange])
  }

  getTicker = (baseToken, quoteToken) => {
    if (!baseToken) {
      throw new Error('baseToken needs to be set')
    }
    if (!quoteToken) {
      throw new Error('quoteToken needs to be set')
    }
    return this.returnResults(() => {
      switch (this._exchange) {
        case ERCdEX:
          console.log(`Connecting to WS ${this._exchange}`)
          return this._call[this._transport].getTicker[this._exchange](
            this._network,
            baseToken,
            quoteToken
          )
        // case Ethfinex:
        //   return this._call[this._transport].getTicker[this._exchange](this._network, baseToken, quoteToken)
        default:
          throw new Error('Relay unknown')
      }
    })
  }

  getTickers = () => {
    console.log(`Fetching tokens prices from ${this._exchange}`)
    // I have only added Ethfinex so far, because this function return every tokens price
    // and we use the data to calcuate the funds assets value.
    // Ethfinex will be our source of truth for the moment.
    // On the exchange, for now, we only need the price of the selected token.
    // Anyway, it's a mock.

    return this.returnResults(() => {
      return this._call[this._transport].getTickers[this._exchange](
        this._network,
        this._exchangeProperties.tickersTokenPairs
      )
    }, FORMAT.tickers[this._exchange])
  }
}

export default Exchange
