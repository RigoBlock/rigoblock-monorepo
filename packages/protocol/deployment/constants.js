const path = require('path')

module.exports = {
  ARTIFACTS_DIR: path.resolve(__dirname, '../artifacts'),
  CONTRACTS_DIR: path.resolve(__dirname, '../contracts'),
  NETWORKS: process.env.NETWORKS || ['http://localhost:8545'],
  GAS_ESTIMATE: 5e6
}
