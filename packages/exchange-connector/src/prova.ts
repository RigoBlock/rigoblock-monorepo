import { EthfinexRaw } from './exchanges/ethfinexRaw'

const getData = async () => {
  const ethfinex = new EthfinexRaw(1)
  const unsubscribe = await ethfinex.ws.getCandles(
    {
      symbols: 'BTCUSD',
      timeframe: ethfinex.options.candlesTimeFrame.ONE_HOUR
    },
    (err, msg) => (err ? console.error(err) : console.log(msg))
  )
  setTimeout(unsubscribe, 3000)
}

getData()
