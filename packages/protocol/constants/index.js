const path = require('path')

module.exports = {
  ARTIFACTS_DIR: path.resolve(__dirname, '../artifacts'),
  CONTRACTS_DIR: path.resolve(__dirname, '../solidity-contracts'),
  NETWORKS: process.env.NETWORKS || ['http://localhost:8545'],
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
