# RigoBlock DApp

## Folder Structure

```
.
├── README.md
├── coverage
├── node_modules
├── output
├── dist            // Dist folder will contain the built files for
│                      production use (populated with yarn build)
├── public
│   └── index.html  // Page template
├── src
│   ├── actions
│   ├── components
│   │   ├── _settings
│   │   ├── atoms
│   │   │   └── Link
│   │   │       ├── __snapshots__
│   │   │       ├── index.js
│   │   │       ├── Link.jsx
│   │   │       ├── Link.scss
│   │   │       ├── Link.stories.js
│   │   │       └── Link.test.js
│   │   ├── molecules
│   │   ├── organisms
│   │   └── templates
│   ├── constants
│   ├── epics
│   ├── images
│   ├── pages
│   ├── reducers
│   ├── store
│   ├── api.js    // API instance
│   ├── index.js    // JavaScript entry point
│   ├── registerServiceWorker.js
│   └── setupTests.js // Jest tests setup file
├── test            // Feature tests are located inside this folder
│   └── pages       // Folder for codecept page objects
├── package.json
└── yarn.lock
```
## Available Scripts

In the project directory, you can run:

### `yarn build`
Builds the app for production to the `dist` folder.
### `yarn start`
Starts an http-server serving the `dist` folder on port 8080.
### `yarn dev`
Runs the app in the development mode.

Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

The page will reload if you make edits.

### `yarn storybook`
Launches Storybook on port 6006
### `yarn storybook:build`
Builds Storybook as static files
### `yarn test`
Launches unit tests and feature tests sequentially.
### `yarn test:unit`
Launches unit tests only and exits upon finishing.
### `yarn test:unit:debug`
Launches unit tests in debug mode.
### `yarn test:unit:watch`
Launches unit tests in interactive mode and listens for changes to the test file.
### `yarn test:feature`
Launches feature tests.
### `yarn test:feature:debug`
Launches feature tests in debug mode.
### `yarn ganache`
Starts up the Ganache-cli with default port, network Id and mnemonic specified in the package.json file
### `yarn ganache:bootstrap`
Deploys all the compiled contracts on Ganache
### `yarn ganache:seed`
Runs the seed script on Ganache
## Filename Conventions

Jest will look for test files with this naming:

* Files with `.test.js` suffix.

The `.test.js` file must be located in the same folder of the relative component.

### Using the DApp with Ganache

To correctly use the DApp with Ganache, you must use Ganache-CLI via the command `yarn ganache` and bootstrap the contracts via `yarn ganache:bootstrap`. After bootstrapping the contract and before starting to make operations, you must go into your MetaMask extension, click on the menu in the top right corner, click settings, and at the bottom select **'Reset Account'**.

This procedure is necessary because we always start Ganache with the same network Id, and doing so confuses MetaMask since it remembers the nonce of the transactions. By clicking 'Reset Account' we are effectively syncing the two again.

> **Note**:
>
> The DApp will not work correctly when using Ganache UI, as Reset Account will not correctly sync MetaMask and the Ganache blockchain.

### Writing Unit Tests

To create tests, add `it()` (or `test()`) blocks with the name of the test and its code. You may optionally wrap them in `describe()` blocks for logical grouping but this is neither required nor recommended.

Jest provides a built-in `expect()` global function for making assertions. A basic test could look like this:

```js
import sum from './sum';

it('sums numbers', () => {
  expect(sum(1, 2)).toEqual(3);
  expect(sum(2, 2)).toEqual(4);
});
```

All `expect()` matchers supported by Jest are [extensively documented here](https://facebook.github.io/jest/docs/en/expect.html#content).
You can also use [`jest.fn()` and `expect(fn).toBeCalled()`](https://facebook.github.io/jest/docs/en/expect.html#tohavebeencalled) to create “spies” or mock functions.

## Offline Cache

We are using [redux-persist](https://github.com/rt2zz/redux-persist) and [localforage](https://github.com/localForage/localForage) libraries to manage redux store persistence on IndexedDB.

[Info on migrations](docs/Migrations.md)

## Feature Tests

Please read the [documentation](docs/Feature_tests.md) for testing the DApp with CodeceptJS.
