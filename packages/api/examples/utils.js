const BigNumber = require('bignumber.js').BigNumber

const toMicro = val => new BigNumber(val).times(1e6)

module.exports = {
  toMicro
}
