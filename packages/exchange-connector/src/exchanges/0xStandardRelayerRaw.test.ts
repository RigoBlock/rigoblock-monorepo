import 'whatwg-fetch'
import * as nock from 'nock'
import StandardRelayerRaw from './0xStandardRelayerRaw'
import nockBackPromise from '../nockBackPromise'

describe('it works', () => {
  beforeEach(() => {
    nock.disableNetConnect()
  })

  afterEach(() => {
    nock.enableNetConnect()
  })

  it('makes a call', async () => {
    const exchange = new StandardRelayerRaw(
      'https://api.ercdex.com/api/standard/1'
    )
    const result = await nockBackPromise('getTokenPairs.json', () =>
      exchange.getTokenPairs()
    )

    // const result = await exchange.getTokenPairs()
    console.log(result)
  })
})
