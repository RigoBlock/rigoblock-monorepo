# RigoBlock DApp

[![CircleCI](https://circleci.com/gh/RigoBlock/rigoblock-monorepo/tree/master.svg?style=shield&circle-token=8a3a97d8673b72dacc5efb04a10492ce473e9afb)](https://circleci.com/gh/RigoBlock/rigoblock-monorepo/tree/master)
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
│   ├── components  // Components have their own folders here
│   │   └── App
│   │       ├── __snapshots__
│   │       ├── App.css
│   │       ├── App.jsx
│   │       ├── App.test.js
│   │       └── index.js
│   ├── index.css
│   ├── index.js    // JavaScript entry point
│   └── registerServiceWorker.js
├── test            // Feature tests are located inside this folder
│   └── pages       // Folder for codecept page objects
├── package.json
└── yarn.lock
```
## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.

### `yarn test`

Launches unit tests and feature tests sequentially.
### `yarn test:unit`

Launches unit tests only and exits upon finishing.
### `yarn test:unit:watch`

Launches unit tests in debug mode.
### `yarn test:unit:debug`

Launches unit tests in interactive mode and listens for changes to the test file.
### `yarn test:feature`

Launches feature tests.
### `yarn test:feature:debug`

Launches feature tests in debug mode.

### `yarn build`

Builds the app for production to the `dist` folder.

### Filename Conventions

Jest will look for test files with this naming:

* Files with `.test.js` suffix.

The `.test.js` file must be located in the same folder of the relative component.

### Writing Tests

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

### Offline Cache

We are using [redux-persist](https://github.com/rt2zz/redux-persist) and [localforage](https://github.com/localForage/localForage) libraries to manage redux store persistence on IndexedDB.

[Info on migrations](docs/MIGRATIONS.md)

### Ganache bootstrapping and seeding

### `yarn ganache`

Starts up the Ganache-cli with default port, network Id and mnemonic specified in the package.json file

### `yarn ganache:bootstrap`

Deploys all the compiled contracts on Ganache

### `yarn ganache:seed`

Runs the seed script on Ganache
