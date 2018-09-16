# Developing new contracts

Create a new directory into `solidity-contracts` and name it accordinly.

Edit `constants/index.js` and add the contract name to `CONTRACT_NAMES` array.

Edit `deploy/index.js` and add the code to deploy in `module.exports`. For example:

```
const faucet = await deploy(baseAccount, network, 'Faucet')
printAddress('Faucet', faucet.address)
```

`deploy` funtion accepts the following:

```
const deploy: (from: any, networkUrl: any, contractName: any, args?: any[]) => Promise<Web3.ContractInstance>
```

Do not forget to return the resulting object.

# Smart Contract Tests

We use [Jest](https://facebook.github.io/jest/docs/en/api.html "Jest API") to test our smart contracts.

## Running tests

To run existing tests, you can run the command `yarn test` from the protocol directory. If you wish to run a specific test only, you can specify a regexp pattern:

```
yarn test Inflation.test
```

Tests do not require Ganache to be up to run correctly.

## Writing new tests

The [_setupTests.js_](../test/setupTests.js) file contains a `beforeAll()` and an `afterAll()` hooks which will programmatically start and close _ganache-cli_ between each test suite.

To make sure it works correctly, when creating a new test file we need to wrap all our tests with `describeContract`

### Example:

```javaScript
const contractName = 'VaultFactory'

describeContract(contractName, () => {
  describe('createVault', () => {
    it('creates a vault when provided with proper parameters', async () => {
      const txHash = await baseContracts[contractName].createVault(
        'test name',
        'NAM'
      )
      expect(txHash).toBeHash()
    })
  })
})
```
This will result in the following output.

```
 PASS  test/VaultFactory/VaultFactory.test.js (13.569s)
    VaultFactory
      createVault
        ✓ creates a vault when provided with proper parameters (248ms)
```

We wrap each contract function with `describe`, and each test within a `it` function. Functions may have several `it` tests, depending on the complexity of the function.

The `baseContracts` object is returned from the [deploy function](../deploy/index.js), and contains all the deployed contracts.

By default if we call a method such as in the example above, `baseContracts[contractName].contractMethod()`, if the method requires a transaction to be made it will send the transaction with the default parameters set in [deploy](../deploy/index.js).

If we wish to call a method with different parameters, for example from another account, we can call it like so:
```
baseContracts[contractName].contractMethod.sendTransactionAsync(...args, {
  from: account,
  gas: gasAmount,
  gasPrice: gasPrice
})
```

When we expect a method call to fail, we use [jest's snapshot feature](https://facebook.github.io/jest/docs/en/snapshot-testing.html) same as we do in the DApp.

```javaScript
    it('can only be called by the rigoblock DAO', async () => {
      await expect(
        baseContracts['RigoToken'].changeRigoblockAddress.sendTransactionAsync(
          accounts[1],
          {
            // non DAO account
            from: accounts[1],
            gas: GAS_ESTIMATE,
            gasPrice: 1
          }
        )
      ).rejects.toThrowErrorMatchingSnapshot()
    })
```
