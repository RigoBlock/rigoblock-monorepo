import { BigNumber } from '@0xproject/utils';
import Web3 from 'web3'
import {
  ERCdEX,
  Ethfinex
} from './const' 

const formatOrdersFromAggregate = (orders) =>{
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
    // console.log(orders)
    const bidsOrders = formatOrdersFromAggregate(orders.buys.priceLevels, 'bids')
    // console.log(bidsOrders)
    const asksOrders = formatOrdersFromAggregate(orders.sells.priceLevels, 'asks')
    // console.log(asksOrders)
    var spread = 0
    // console.log(asksOrders.length)
    if (bidsOrders.length !== 0 && asksOrders.length !== 0) {
      spread = new BigNumber(asksOrders[asksOrders.length - 1].orderPrice).minus(new BigNumber(bidsOrders[0].orderPrice)).toFixed(5)
    } else {
      spread = new BigNumber(0).toFixed(5)
    }
    return {
      bids: bidsOrders,
      asks: asksOrders,
      spread,
      aggregated: true
    }
  },
  // [Ethfinex]: (tickers) => {
  //   var tickersList = tickers.map(ticker => {
  //     return {
  //       priceEth: ticker[7].toString(),
  //       priceUsd: '',
  //       symbol: ticker[0].substr(1, 3),
  //     }
  //   }
  //   )
  //   tickersList.push({
  //     priceEth: '1',
  //     priceUsd: '',
  //     symbol: 'WETH'
  //   })
  //   return tickersList
  // }
}