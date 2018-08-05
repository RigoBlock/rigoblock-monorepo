// Copyright 2017 Rigo Investment Sagl.
// This file is part of RigoBlock.

import { NETWORKS_ID, SupportedExchanges } from './const'
import ReconnectingWebSocket from 'reconnecting-websocket'

export const getTicker = {
  ERCdEX: (networkId = 1, baseTokenAddress, quoteTokenAddress) => {
    const websocket = new ReconnectingWebSocket(
      SupportedExchanges.ERCdEX.ws[NETWORKS_ID[networkId]]
    )
    websocket.addEventListener('open', () => {
      console.log('WebSocket open.')
      websocket.send(
        `sub:pair-order-change/${baseTokenAddress}/${quoteTokenAddress}`
      )
      websocket.send(
        `sub:pair-order-change/${quoteTokenAddress}/${baseTokenAddress}`
      )
    })
    console.log(websocket)
    return websocket
  }
  // Ethfinex: (networkId = 1) => {
  //   const symbols = SupportedExchanges.Ethfinex.tickersTokenPairs.toString()
  //   const options = {
  //     method: 'GET',
  //     url: `${SupportedExchanges.Ethfinex.http[NETWORKS_ID[networkId]]}/tickers?symbols=${symbols}`,
  //     qs: {},
  //     json: true
  //   }
  //   return options
  // }
}
