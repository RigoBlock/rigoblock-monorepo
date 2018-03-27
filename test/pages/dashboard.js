let I

module.exports = {
  _init() {
    I = require('../steps')()
  },

  assertImOnPage() {
    I.waitInUrl('/')
    I.see('RigoBlock')
  },

  navigateToVault() {
    I.click('.link')
    I.waitInUrl('/vault')
    I.see('Vault')
  }
}
