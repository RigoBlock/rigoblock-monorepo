## Smart Contracts Deployer

A packages that facilitates the compilation and deployment of smart contracts. Deployer will automatically fetch and download the appropriate version of _Sol Compiler_ to compile each contract.

#### This package is a fork from the 0xproject Monorepo. [Link to the original package](https://github.com/0xProject/0x-monorepo/tree/d08bfbf7054d0d98680daab3d1fdc0ac878dcc16/packages/deployer)

## Importing the package

```javascript
import { Deployer, Compiler } from '@rigoblock/deployer';
```

or

```javascript
const Deployer = require('@rigoblock/deployer').Deployer;
const Compiler = require('@rigoblock/deployer').Compiler;
```


## Available Scripts

In the project directory, you can run:

### `yarn build`
Builds the app for production to the `dist` folder.

### `yarn build:watch`
Builds the app and watches for changes.

### `yarn run_mocha`
Runs tests with Mocha and Chai.

### `yarn test`
Builds the app, transpiling TypeScript, then runs `yarn run_mocha`

### `yarn lint`
Lints all typescript files.


### Note

When developing the package locally, make sure to run `yarn bootstrap` in the root directory of the monorepo, and build the package before running it in other packages.
