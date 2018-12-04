import * as crypto from 'crypto'
import * as moment from 'moment'
import { supportedExchanges } from '@rigoblock/exchange-connector'
import connector from '../connector'

export class TokenPrice {
  constructor() {}

  public async fetch(symbol, networkId) {
    const ethfinex = connector.getExchange(supportedExchanges.ETHFINEX_RAW, {
      networkId
    })
    const rawCandles = await ethfinex.http.getCandles({
      timeframe: ethfinex.options.candlesTimeFrame.ONE_DAY,
      symbols: `${symbol}ETH`,
      section: ethfinex.options.candlesSection.HIST,
      limit: '1000'
    })
    if (<any>rawCandles[0] === 'error') {
      return rawCandles
    }
    const candles = rawCandles
      .map(rawCandle => {
        const date = moment(rawCandle[0]).toISOString()
        const hash = crypto.createHmac('sha1', rawCandle.join()).digest('hex')
        return {
          [date]: {
            hash,
            value: rawCandle
          }
        }
      })
      .reduce((acc, curr) => ({ ...acc, ...curr }), {})
    return candles
  }

  public compareData(oldCandles, newCandles) {
    const firstSet = this.values(oldCandles).slice(0, oldCandles.length - 1)
    const secondSet = this.values(newCandles).slice(1)
    return firstSet
      .map((el, index) => {
        return el.hash === secondSet[index].hash
          ? null
          : {
              oldValue: secondSet[index].value,
              newValue: el.value
            }
      })
      .filter(el => !!el)
  }
  // Object.values does not work with Typescript
  private values = obj => Object.keys(obj).map(key => obj[key])
}
