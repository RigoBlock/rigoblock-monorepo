export const formatTickers = {
  ERCDeX: (tickers) => {
    return tickers.map(ticker => {
      return {
        priceEth: ticker.priceEth,
        priceUsd: ticker.usdPrice,
        symbol: ticker.symbol,
      }
    })
  },
  Ethfinex: (tickers) => {
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