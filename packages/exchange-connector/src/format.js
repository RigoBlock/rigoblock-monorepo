import { BigNumber } from '@0xproject/utils';
import Web3 from 'web3'
import {
  ERCdEX,
  Ethfinex
} from './const' 

const formatOrdersFromAggregateERCdEX = (orders) =>{
  var orderPrice, orderAmount
  let web3 = new Web3(Web3.currentProvider)
  var formattedOrders = orders.map((order) => {
    orderPrice = new BigNumber(order.price).toFixed(7)
    orderAmount = new BigNumber(web3.utils.fromWei(order.volume)).toFixed(5)
    var orderObject = {
      orderAmount,
      orderPrice,
    }
    return orderObject
  })
  return formattedOrders
}

const formatOrdersFromAggregateEthfinex = (orders) =>{
  var orderPrice, orderAmount
  var formattedOrders = orders.map((order) => {
    orderPrice = new BigNumber(order[0]).toFixed(7)
    orderAmount = new BigNumber(order[2]).abs().toFixed(5)
    var orderObject = {
      orderAmount,
      orderPrice,
    }
    return orderObject
  })
  return formattedOrders
}

const calculateSpread = (asksOrders, bidsOrders) => {
  var spread = 0
  if (bidsOrders.length !== 0 && asksOrders.length !== 0) {
    spread = new BigNumber(asksOrders[asksOrders.length - 1].orderPrice).minus(new BigNumber(bidsOrders[0].orderPrice)).toFixed(6)
  } else {
    spread = new BigNumber(0).toFixed(6)
  }
  return spread
}

export const tickers = {
  [ERCdEX]: (tickers) => {
    return tickers.map(ticker => {
      return {
        priceEth: ticker.priceEth,
        priceUsd: ticker.usdPrice,
        symbol: ticker.symbol,
      }
    })
  },
  [Ethfinex]: (tickers) => {
    var tickersList = tickers.map(ticker => {
      return {
        priceEth: ticker[7].toString(),
        priceUsd: '',
        symbol: ticker[0].substr(1, 3),
      }
    }
    )
    tickersList.push({
      priceEth: '1',
      priceUsd: '',
      symbol: 'WETH'
    })
    return tickersList
  }
}

export const aggregatedOrders = {
  [ERCdEX]: (orders) => {
    const bidsOrders = formatOrdersFromAggregateERCdEX(orders.buys.priceLevels, 'bids')
    const asksOrders = formatOrdersFromAggregateERCdEX(orders.sells.priceLevels, 'asks')
    const spread = calculateSpread(asksOrders, bidsOrders)
    return {
      bids: bidsOrders,
      asks: asksOrders,
      spread,
      aggregated: true
    }
  },
  [Ethfinex]: (orders) => {
    var bids = new Array()
    var asks = new Array()
    orders.map(order => {
      (order[2] > 0) ? bids.push(order) : asks.push(order)
    })
    const bidsOrders = formatOrdersFromAggregateEthfinex(bids, 'bids')
    console.log(bidsOrders)
    const asksOrders = formatOrdersFromAggregateEthfinex(asks.reverse(), 'asks')
    console.log(asksOrders)
    const spread = calculateSpread(asksOrders, bidsOrders)
    return {
      bids: bidsOrders,
      asks: asksOrders,
      spread,
      aggregated: true
    }
  },
}