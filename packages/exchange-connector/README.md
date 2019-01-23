# Exchange connector

An API to simplify interaction with token Exchanges.

## Importing the package

```javascript
import exchangeConnector, { supportedExchanges, NETWORKS, exchanges } from '@rigoblock/exchange-connector'
```

## How to use it

You can instantiate a new exchange using the `exchangeConnector` function, passing the exchange name as first parameter and an options object as second parameter.
The available options are: `networkdId` (defaults to 1), `httpUrl` and `wsUrl`. Supported relayers do not need the API's http url and websocket url to be specified, but they are needed when instantiating a 0x standard relayer.

To take advantage of the singleton, recommended is to have a separate file exporting a ExchangeConnector instance, and to import the instance in the files where we plan to use it.

example:

```javascript
// exchangeConnector.js
import ExchangeConnector from '@rigoblock/exchange-connector'

export default new ExchangeConnector()

// someOtherFile.js
import { supportedExchanges, NETWORKS } from '@rigoblock/exchange-connector'
import connector from './exchangeConnector.js'

const ethfinex = connector.getExchange(supportedExchanges.ETHFINEX, {
  networkId: NETWORKS.KOVAN
})

const tickersKovan = await ethfinex.http.getTickers({
  symbols: ['ZRXETH']
})
```

Some methods require specific parameters to be passed, these are saved under a public property `options` on the class instance.

```javascript
import {
  NETWORKS,
  supportedExchanges
} from '@rigoblock/exchange-connector'
import connector from './exchangeConnector.js'

const ethfinex = connector.getExchange(supportedExchanges.ETHFINEX, {
  networkId: NETWORKS.KOVAN
})

const orders = await ethfinex.http.getOrders({
  symbols: 'ZRXETH',
  precision: ethfinex.options.OrderPrecisions.P4
})
```

The first websocket method that gets invoked will create the connection, which is reused by subsequent calls. A callback is to be passed to these calls as a second parameter to be able to receive the data. All the websocket methods return an unsubscribe function that removes the even listener added to the connection.

To close the websocket connection, you can call the `close()` method.

```javascript
const unsubscribe = await ethfinex.ws.getTickers(
  { symbols: 'ZRXETH' },
  (error, data) => (error ? console.error(error) : console.log(data))
)
// later when you wish to stop listening
unsubscribe()

await ethfinex.ws.close()
```

'RAW' exchange classes will return data unfiltered and unformatted from the API, while non RAW ones will return the data formatted.

## Setup

### Available Scripts

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

## Contributing

Read our [contribution guidelines](https://github.com/RigoBlock/rigoblock-monorepo/blob/master/CONTRIBUTING.md).
