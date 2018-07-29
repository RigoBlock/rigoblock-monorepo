// Copyright 2017 Rigo Investment Sagl.
// This file is part of RigoBlock.

import { getTickers } from './exchanges'
import { SupportedExchanges } from './const'
import { formatTickers } from './format'
import rp from 'request-promise'

class Exchange {
  constructor(exchange, network = '1') {
    if (typeof SupportedExchanges[exchange] === 'undefined') {
      throw new Error('Exchange not supported: ' + exchange)
    }
    if (!SupportedExchanges[exchange].supportedNetworks.includes(network)) {
      throw new Error('Network not supported on this exchange: ' + network)
    }
    // console.log(exchange, network)
    this._exchange = exchange
    this._network = network
    this._exchangeProperties = SupportedExchanges[exchange]
  }

  returnResults = (query, formatFunction = (input) => { return input}) => {
    return rp(query)
    .then(results => {
      // console.log(results)
      // console.log(formatFunction(results))
      return formatFunction(results)
    })
    .catch(err => {
      return err
    })
  }

  getTickers = () => {
    // console.log(`Fetching tokens prices from ${this._exchange}`)
    // console.log(SupportedExchanges.Ethfinex.tickersTokenPairs.toString())
    return this.returnResults(getTickers[this._exchange](this._network, this._exchangeProperties.tickersTokenPairs), formatTickers[this._exchange])
  }
}

export default Exchange