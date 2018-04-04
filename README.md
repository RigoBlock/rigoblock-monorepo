# Rigoblock

---




## Packages

| Package                                                         | Description                                                      |
| --------------------------------------------------------------- | ---------------------------------------------------------------- |
| [`Rigoblock Dapp`](/packages/rigoblock-dapp)                    | Rigoblock Dapp                                                   |
| [`Pool API`](/packages/rigoblock-pool-api)                      | A wrapper library with preset rpc calls to our pools.            |
| [`Rigoblock Protocol`](/packages/rigoblock-protocol)            | A faucet micro-service that dispenses test ERC20 tokens or Ether |



### Install dependencies



### Build

Build all packages.
<!-- You can change several packages and run the changes without publishing them first to NPM. When
running `rebuild`, Lerna will figure out the dependency order of all the packages, and build them in
this order. -->

```bash
yarn lerna:rebuild
```

Or continuously rebuild on change:

```bash
yarn dev
```

### Lint

Lint all packages

```bash
yarn lerna:run lint
```
