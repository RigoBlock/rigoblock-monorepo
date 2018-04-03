const path = require('path')

module.exports = {
  ARTIFACTS_FOLDER: path.resolve('artifacts'),
  CONTRACTS_FOLDER: path.resolve('..', '..', 'rigoblock-protocol', 'contracts'),
  GANACHE_URL: 'http://localhost:8545',
  GAS_ESTIMATE: 5e6
}
