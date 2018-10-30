import * as hashes from 'jshashes'
import * as moment from 'moment'
import exchangeConnector, {
  exchanges,
  supportedExchanges
} from '@rigoblock/exchange-connector'

export class TokenPrice {
  constructor() {}

  public async fetch(symbol, networkId) {
    const SHA1 = new hashes.SHA1()
    const { EthfinexRaw } = exchanges
    const ethfinex = exchangeConnector(supportedExchanges.ETHFINEX_RAW, {
      networkId
    })
    const rawCandles = await ethfinex.http.getCandles({
      timeframe: EthfinexRaw.CandlesTimeFrame.ONE_DAY,
      symbols: `${symbol}ETH`,
      section: EthfinexRaw.CandlesSection.HIST,
      limit: '1000'
    })
    if (<any>rawCandles[0] === 'error') {
      return rawCandles
    }
    const candles = rawCandles
      .map(rawCandle => {
        const date = moment(rawCandle[0]).toISOString()
        const hash = SHA1.hex(rawCandle.join())
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

  public compareData(oldData, newData) {
    const firstSet = this.values(oldData).slice(0, oldData.length - 1)
    const secondSet = this.values(newData).slice(1)
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
