import { BigNumber } from '@0xproject/utils'
import { ERCdEX, Ethfinex } from './const'
import { ZeroEx } from '0x.js'
import Web3 from 'web3'

const formatOrdersFromAggregateERCdEX = orders => {
  let orderPrice, orderAmount
  let web3 = new Web3(Web3.currentProvider)
  let formattedOrders = orders.map(order => {
    orderPrice = new BigNumber(order.price).toFixed(7)
    orderAmount = new BigNumber(web3.utils.fromWei(order.volume)).toFixed(5)
    let orderObject = {
      orderAmount,
      orderPrice
    }
    return orderObject
  })
  return formattedOrders
}

export const formatOrdersFromERCdEX = (orders, orderType) => {
  let orderPrice, orderAmount
  let web3 = new Web3(Web3.currentProvider)
  let formattedOrders = orders.map(order => {
    switch (orderType) {
      case 'asks':
        orderPrice = new BigNumber(order.takerTokenAmount)
          .div(new BigNumber(order.makerTokenAmount))
          .toFixed(7)
        orderAmount = new BigNumber(
          web3.utils.fromWei(order.makerTokenAmount, 'ether')
        ).toFixed(5)
        break
      case 'bids':
        orderPrice = new BigNumber(1)
          .div(
            new BigNumber(order.takerTokenAmount).div(
              new BigNumber(order.makerTokenAmount)
            )
          )
          .toFixed(7)
        orderAmount = new BigNumber(
          web3.utils.fromWei(order.takerTokenAmount, 'ether')
        ).toFixed(5)
        break
    }
    let orderHash = ZeroEx.getOrderHashHex(order)
    let orderObject = {
      order,
      orderAmount,
      orderType,
      orderPrice,
      orderHash
    }
    return orderObject
  })
  return formattedOrders
}

const formatOrdersFromAggregateEthfinex = orders => {
  let orderPrice, orderAmount
  let formattedOrders = orders.map(order => {
    orderPrice = new BigNumber(order[0]).toFixed(7)
    orderAmount = new BigNumber(order[2]).abs().toFixed(5)
    let orderObject = {
      orderAmount,
      orderPrice
    }
    return orderObject
  })
  return formattedOrders
}

const calculateSpread = (asksOrders, bidsOrders) => {
  let spread = 0
  if (bidsOrders.length !== 0 && asksOrders.length !== 0) {
    spread = new BigNumber(asksOrders[asksOrders.length - 1].orderPrice)
      .minus(new BigNumber(bidsOrders[0].orderPrice))
      .toFixed(6)
  } else {
    spread = new BigNumber(0).toFixed(6)
  }
  return spread
}

export const tickers = {
  [ERCdEX]: tickers => {
    let tickersList = tickers.map(ticker => {
      return {
        priceEth: ticker.priceEth,
        priceUsd: ticker.usdPrice,
        symbol: ticker.symbol
      }
    })
    return tickersList
  },
  [Ethfinex]: tickers => {
    let tickersList = tickers.map(ticker => {
      return {
        priceEth: ticker[7].toString(),
        priceUsd: '',
        symbol: ticker[0].substr(1, 3)
      }
    })
    tickersList.push({
      priceEth: '1',
      priceUsd: '',
      symbol: 'WETH'
    })
    tickersList.push({
      priceEth: '1',
      priceUsd: '',
      symbol: 'ETH'
    })
    return tickersList
  }
}

export const aggregatedOrders = {
  [ERCdEX]: orders => {
    const bidsOrders = formatOrdersFromAggregateERCdEX(
      orders.buys.priceLevels,
      'bids'
    )
    const asksOrders = formatOrdersFromAggregateERCdEX(
      orders.sells.priceLevels,
      'asks'
    )
    const spread = calculateSpread(asksOrders, bidsOrders)
    return {
      bids: bidsOrders,
      asks: asksOrders,
      spread
      // aggregated: true
    }
  },
  [Ethfinex]: orders => {
    let bids = new Array()
    let asks = new Array()
    orders.map(order => {
      order[2] > 0 ? bids.push(order) : asks.push(order)
    })
    const bidsOrders = formatOrdersFromAggregateEthfinex(bids, 'bids')
    const asksOrders = formatOrdersFromAggregateEthfinex(asks.reverse(), 'asks')
    // console.log(bidsOrders)
    // console.log(asksOrders)
    const spread = calculateSpread(asksOrders, bidsOrders)
    return {
      bids: bidsOrders,
      asks: asksOrders,
      spread
      // aggregated: true
    }
  }
}

export const orders = {
  [ERCdEX]: orders => {
    const bidsOrders = formatOrdersFromERCdEX(orders.bids, 'bids')
    const asksOrders = formatOrdersFromERCdEX(orders.asks, 'asks')
    const spread = calculateSpread(asksOrders, bidsOrders)
    return {
      bids: bidsOrders,
      asks: asksOrders,
      spread
      // aggregated: false
    }
  }
  // [Ethfinex]: (orders) => {
  //   var bids = new Array()
  //   var asks = new Array()
  //   orders.map(order => {
  //     (order[2] > 0) ? bids.push(order) : asks.push(order)
  //   })
  //   const bidsOrders = formatOrdersFromAggregateEthfinex(bids, 'bids')
  //   const asksOrders = formatOrdersFromAggregateEthfinex(asks.reverse(), 'asks')
  //   // console.log(bidsOrders)
  //   // console.log(asksOrders)
  //   const spread = calculateSpread(asksOrders, bidsOrders)
  //   return {
  //     bids: bidsOrders,
  //     asks: asksOrders,
  //     spread,
  //     aggregated: true
  //   }
  // },
}

export const historicalPricesData = {
  [ERCdEX]: historical => {
    // return historical
    return historical.map(entry => {
      const date = new Date(entry.date)
      entry.date = date
      return entry
    })
  }
  // [Ethfinex]: (orders) => {
  //   var bids = new Array()
  //   var asks = new Array()
  //   orders.map(order => {
  //     (order[2] > 0) ? bids.push(order) : asks.push(order)
  //   })
  //   const bidsOrders = formatOrdersFromAggregateEthfinex(bids, 'bids')
  //   const asksOrders = formatOrdersFromAggregateEthfinex(asks.reverse(), 'asks')
  //   // console.log(bidsOrders)
  //   // console.log(asksOrders)
  //   const spread = calculateSpread(asksOrders, bidsOrders)
  //   return {
  //     bids: bidsOrders,
  //     asks: asksOrders,
  //     spread,
  //     aggregated: true
  //   }
  // },
}
