const path = require('path')

const NETWORKS = process.env.NETWORKS
  ? process.env.NETWORKS.split(',')
  : ['http://localhost:8545']

module.exports = {
  ARTIFACTS_DIR: path.resolve(__dirname, '../artifacts'),
  CONTRACTS_DIR: path.resolve(__dirname, '../solidity-contracts'),
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
