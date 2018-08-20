# Exchange connector

An API to simplify interaction with token Exchanges.

## Importing the package

```javascript
import { exchangeFactory, supportedExchanges, NETWORKS, exchangesMap } from '@rigoblock/exchange-connector'
```

or

```javascript
const exchangeConnector = require('@rigoblock/exchange-connector')

const exchangeFactory = require('@rigoblock/exchange-connector').exchangeFactory

```

## How to use it

You can instantiate a new exchange using the `exchangeFactory` function, passing the exchange name, network id and transport as strings.

```javascript

import { exchangeFactory, supportedExchanges, NETWORKS } from '@rigoblock/exchange-connector'

const exchange = exchangeFactory(supportedExchanges.ETHFINEX, NETWORKS.KOVAN, 'http')

// or const exchange = exchangeFactory('Ethfinex', '42', 'http')

exchange.getOrders('ZRX', 'ETH')

```

>When instantiating an exchange, 'transport' defaults to **http** if left unspecified.

The package also exports a `exchangeMap` object which contains the supported exchanges classes, if one wishes to instantiate the exchange without using the factory function.

```javascript

import { exchangeMap, NETWORKS } from '@rigoblock/exchange-connector'

const ethfinex = new exchangeMap.Ethfinex(NETWORKS.MAINNET, 'http')

ethfinex.getTickers({ tokenPairs: ['tZRXETH'] })

```


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
