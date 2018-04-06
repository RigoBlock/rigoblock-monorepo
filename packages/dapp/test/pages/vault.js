let I

module.exports = {
  _init() {
    I = require('../steps')()
  },

  navigateTo() {
    I.amOnPage('/vault')
  },

  assertImOnPage() {
    I.waitInUrl('/vault')
    I.see('Vault')
  }
}
