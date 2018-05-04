const path = require('path')

const NETWORKS = process.env.NETWORKS
  ? process.env.NETWORKS.split(',')
  : ['http://localhost:8545']

module.exports = {
  ARTIFACTS_DIR: path.resolve(__dirname, '../artifacts'),
  CONTRACTS_DIR: path.resolve(__dirname, '../solidity-contracts'),
  NETWORKS,
  GAS_ESTIMATE: 5e6,
  CONTRACT_NAMES: [
    'Authority',
    'Distribution',
    'Drago',
    'DragoEventful',
    'DragoFactory',
    'DragoRegistry',
    'ERC20',
    'Inflation',
    'Migrations',
    'Owned',
    'OwnedUninitialized',
    'ProofOfPerformance',
    'RigoToken',
    'UnlimitedAllowanceToken',
    'Vault',
    'VaultEventful',
    'VaultFactory'
  ]
}
