# Exchange connector

An API to simplify interaction with token Exchanges.

## Importing the package

```javascript
import exchangeConnector, { supportedExchanges, NETWORKS, exchanges } from '@rigoblock/exchange-connector'
```

## How to use it

You can instantiate a new exchange using the `exchangeConnector` function, passing the exchange name as first parameter and an options object as second parameter.
The available options are: `networkdId` (defaults to 1), `httpUrl` and `wsUrl`. Supported relayers do not need the API's http url and websocket url to be specified, but they are needed when instantiating a 0x standard relayer.

```javascript
import exchangeConnector, { supportedExchanges, NETWORKS } from '@rigoblock/exchange-connector'

const ethfinex = exchangeConnector(supportedExchanges.ETHFINEX, {
  networkId: NETWORKS.KOVAN
})

const tickersKovan = await ethfinex.http.getTickers({
  symbols: ['ZRXETH']
})

const tickersMainnet = await ethfinex.network(NETWORKS.MAINNET).http.getTickers({
  symbols: ['ZRXETH']
})
```

Some methods require specific parameters to be passed, so these are saved under an exchange class namespace

```javascript
import exchangeConnector, {
  NETWORKS,
  exchanges,
  supportedExchanges
} from '@rigoblock/exchange-connector'

const ethfinex = exchangeConnector(supportedExchanges.ETHFINEX, {
  networkId: NETWORKS.KOVAN
})

const ethfinex = exchangeConnector(supportedExchanges.ETHFINEX, {
  networkId: NETWORKS.KOVAN
})

const orders = await ethfinex.http.getOrders({
  symbols: 'ZRXETH',
  precision: exchanges[supportedExchanges.ETHFINEX_RAW].OrderPrecisions.P4
})
```

To use websocket methods, a callback is to be passed as a second parameter to the call, to be able to receive the data

```javascript
const tickers = await ethfinex.ws.getTickers(
  { symbols: 'ZRXETH' },
  (error, data) => (error ? console.error(error) : console.log(data))
)
```

'RAW' exchange classes will return data unfiltered and unformatted from the API,while non RAW ones will return the data formatted.

## Available Scripts

In the project directory, you can run:

### `yarn build`
Builds the app for production to the `dist` folder.

### `yarn test:unit`
Runs tests with Jest.

### `yarn test:unit:watch`
Runs tests with Jest watching for changes.

### `yarn lint`
Lints all typescript files.

### Note

When developing the package locally, make sure to run `yarn bootstrap` in the root directory of the monorepo, and build the package before running it in other packages.
