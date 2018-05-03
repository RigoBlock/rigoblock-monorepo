# Rigoblock
[![CircleCI](https://circleci.com/gh/RigoBlock/rigoblock-monorepo/tree/master.svg?style=shield&circle-token=8a3a97d8673b72dacc5efb04a10492ce473e9afb)](https://circleci.com/gh/RigoBlock/rigoblock-monorepo/tree/master)
[![Standard JS](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
---

## Packages

| Package| Description|
| - | - |
| [`Rigoblock DApp`](/packages/dapp)                  | Rigoblock DApp                                                     |
| [`API`](/packages/api)                    | A wrapper library with preset RPC calls to our contracts               |
| [`Rigoblock Protocol`](/packages/protocol)          | Rigoblock Protocol                                                 |
| [`Ganache Bootstrap`](/packages/ganache-bootstrap)  | A bootstrapping package to deploy smart contracts and seed Ganache |


### Install

Install lerna using yarn and the frozen lockfile option, so as not to accidentally update packages and break the build
```
yarn --frozen-lockfile
```

Bootstrap all packages and install all their dependencies
```
yarn bootstrap
```
Build all packages in order. Ganache needs to be launched first as it is required for protocol contracts to be compiled. Optionally you can open the Ganache client instead of using the CLI.
```
npx lerna run --loglevel silent --scope @rigoblock/dapp ganache &> /dev/null &
yarn build
kill %1
```

### Lint

Lint all packages

```
yarn lint
```
