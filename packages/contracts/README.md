# RigoBlock Contracts

## Available Scripts

In the project directory, you can run:

### `yarn ganache`

Starts the Ganache-cli server on port 8545 and with network Id 5777.

### `yarn compile`

Compiles all solidity contracts and generates the JSON artifacts. The contract's abi and address are stored under `networks[networkId]`.

### `yarn build`

In order: compiles all contracts, deleted *dist* folder, bootstraps contract on ganache, builds with webpack. **Requires Ganache to be up prior to running the command.**

### `yarn test`

Runs tests for the solidity contracts. **Ganache must not be up** when running this command as it will automatically start it before each test suite.

### `yarn lint`

Lints all JS files.

### `yarn deploy`

Launches the smart contract deployment CLI.

## Contract deployment

- Create a new branch (eg. `git checkout -b feature/kovan-contracts-deployment`)
- From the `rigoblock-monorepo/packages/contracts` directory, launch `yarn deploy`
- In the CLI:
  - select the network where you wish to deploy the contract
  - Insert your public key (wallet address)
  - Insert the name of the contract to be deployed
  - Insert the arguments required from the contract, if any, separated by a comma
  - Insert your account mnemonic
- The `contracts/artifacts` folder will now have uncommitted changes, commit them.
- Push the changes to Github (`git push --set-upstream origin your-branch-name`)
- Open a pull request with your changes and await approval.

>Note: At the current time it is necessary to pass the account MNEMONIC rather than the private key.


Here is a demo of how the script works:

![kapture 2018-10-25 at 16 06 14](https://user-images.githubusercontent.com/11726051/47506264-fc42b600-d86f-11e8-9f16-1df1da3f1dc1.gif)

## Writing Tests

Read the [testing documentation.](docs/testing.md)
