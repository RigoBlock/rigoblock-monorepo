let I

module.exports = {
  _init() {
    I = require('../steps')()
  },

  navigateTo() {
    I.amOnPage('/help')
  },

  assertImOnPage() {
    I.waitInUrl('/help')
    I.see('Help', 'h1')
  }
}
