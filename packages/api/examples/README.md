# Working API examples

## Setup

### Install all dependencies

From the examples directory, run:

    npm i

or using yarn:

    yarn

### Start up Ganache

[Ganache](https://truffleframework.com/ganache) is required and must be up to run the examples locally. A [cli version](https://github.com/trufflesuite/ganache-cli) is also available.

### Bootstrap contracts onto Ganache

From the examples directory:

```bash
  node bootstrapContracts.js
```

This will deploy all the smart contracts in order on the Ganache local blockChain.

### Run the example files

Each example file can be run with node.
