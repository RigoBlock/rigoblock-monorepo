let I

module.exports = {
  _init() {
    I = require('../steps')()
  },

  navigateTo() {
    I.amOnPage('/')
  },

  assertImOnPage() {
    I.waitInUrl('/')
    I.waitForText('Dashboard', 'h1')
  }
}
