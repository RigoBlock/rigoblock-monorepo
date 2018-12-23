# Rigoblock
[![CircleCI](https://circleci.com/gh/RigoBlock/rigoblock-monorepo/tree/master.svg?style=shield&circle-token=8a3a97d8673b72dacc5efb04a10492ce473e9afb)](https://circleci.com/gh/RigoBlock/rigoblock-monorepo/tree/master)
[![Standard JS](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
---

## Packages

| Package| Description|
| - | - |
| [`Rigoblock ĐApp`](/packages/dapp)                  | Rigoblock ĐApp                                                     |
| [`API`](/packages/api)                    | Rigoblock API               |
| [`Rigoblock Contracts`](/packages/contracts)          | Rigoblock Contracts                                                 |
| [`Deployer`](/packages/deployer)          | A package to compile and deploy our smart contracts                                       |
| [`Ganache Bootstrap`](/packages/ganache-bootstrap)  | A bootstrapping package to deploy smart contracts and seed Ganache |
| [`Stats`](/packages/stats)  | Data collection system |


### Install

Ubuntu pre-requisites:
```
apt-get install build-essential libusb libudev-dev 
```

Install nvm and use the correct node version
```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash

nvm use
```
> If you are having issues following this step check out [nvm's documentation](https://github.com/creationix/nvm/blob/master/README.md)


Install yarn
```
npm i -g yarn
```

Install lerna using yarn and the frozen lockfile option, so as not to accidentally update packages and break the build
```
yarn --frozen-lockfile
```

Bootstrap all packages and install all their dependencies
```
yarn bootstrap
```
Build all packages in order. Ganache needs to be launched first as it is required for our contracts to be compiled. Optionally you can open the Ganache client instead of using the CLI.
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

### Publishing packages

To publish the packages in the monorepo to NPM you need to create a new branch and let lerna do the job.

**:warning: Make sure to start from a clean-state ganache when publishing! Otherwise staging won't be able to connect to the smart contracts deployed on ganache**

```
git checkout master
git checkout -b feature/publish-# # Use an incremental number
git push -u origin feature/publish-#
yarn build
npx lerna publish
```

Lerna will ask you for new versions and:
- Updates package version
- Updates packages that depend on that package
- Commit
- Tag the current commit with `package@version`
- Publish to NPM
- Push to Github

So at the end you'll need to create a PR with your `feature/publish-#` branch and merge it to master in order to tag properly the main branch.
