# Exchange connector

An API to simplify interaction with token Exchanges.

## Importing the package

```javascript
import exchangeConnector, { supportedExchanges, NETWORKS, exchangesMap } from '@rigoblock/exchange-connector'
```

or

```javascript
const exchangeConnector = require('@rigoblock/exchange-connector')

const exchangeConnector = require('@rigoblock/exchange-connector').default

```

## How to use it

You can instantiate a new exchange using the `exchangeConnector` function, passing the exchange name, network id and transport as strings.

```javascript
import exchangeConnector, { supportedExchanges, NETWORKS } from '@rigoblock/exchange-connector'

const exchange = exchangeConnector(supportedExchanges.ETHFINEX, NETWORKS.KOVAN, 'http')

// or const exchange = exchangeConnector('Ethfinex', '42', 'http')

const zrxOrders = await exchange.getOrders('ZRX', 'ETH')

await exchangeConnector(
  supportedExchanges.ETHFINEX,
  NETWORKS.MAINNET
).getTickers({
  tokenPairs: ['tZRXETH']
})
```

>When instantiating an exchange, 'transport' defaults to **http** if left unspecified.


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
