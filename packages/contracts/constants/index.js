const path = require('path')

const NETWORKS = {
  ganache: 'http://localhost:8545',
  mainnet: 'https://mainnet.infura.io/v3/d48872aa1c00471c825e9d856c3c3138',
  ropsten: 'https://ropsten.infura.io/v3/d48872aa1c00471c825e9d856c3c3138',
  kovan: 'https://kovan.infura.io/v3/d48872aa1c00471c825e9d856c3c3138'
}

module.exports = {
  TMP_DIR: '.tmp',
  ARTIFACTS_DIR: path.resolve(__dirname, '../artifacts'),
  CONTRACTS_DIR: path.resolve(__dirname, '../src'),
  NETWORKS,
  GANACHE_PORT: 8545,
  GANACHE_NETWORK_ID: 5777,
  GAS_ESTIMATE: 5e6,
  CONTRACT_NAMES: [
    'AEthfinex',
    'AWeth',
    'Authority',
    'Distribution',
    'Drago',
    'DragoEventful',
    'DragoFactory',
    'DragoRegistry',
    'Faucet',
    'ERC20',
    'ExchangeEfx',
    'ExchangeV1Fork',
    'ExchangesAuthority',
    'Inflation',
    'Migrations',
    'NavVerifier',
    'Owned',
    'OwnedUninitialized',
    'ProofOfPerformance',
    'RigoToken',
    'SigVerifier',
    'TokenTransferProxy',
    'UnlimitedAllowanceToken',
    'Vault',
    'VaultEventful',
    'VaultFactory',
    'WETH9',
    'WrapperLock',
    'WrapperLockEth'
  ]
}
