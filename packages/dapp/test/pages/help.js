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
    I.waitForText('Help', 'h1')
  }
}
