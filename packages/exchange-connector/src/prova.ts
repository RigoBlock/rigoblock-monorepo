import { NETWORKS } from './constants'
import EthfinexRaw from './exchanges/ethfinexRaw'

const test = new EthfinexRaw(NETWORKS.MAINNET)

const getData = async () => {
  // const candles = await test.ws.getCandles(
  //   { timeframe: '1m', symbols: 'BTCUSD' },
  //   (err, message) =>
  //     err ? console.error(err) : console.log('From the callback', message)
  // )
  const unsubscribe = await test.ws.getTickers(
    { symbols: 'BTCUSD' },
    (err, message) => (err ? console.error(err) : message)
  )
  console.log(test.ws.connection()._listeners)
  unsubscribe()
  console.log(test.ws.connection()._listeners)
}

getData()
