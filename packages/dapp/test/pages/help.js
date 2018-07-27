let I

module.exports = {
  _init() {
    I = require('../steps')()
  },

  navigateTo() {
    I.navigateToUrl('/help')
  },

  assertImOnPage() {
    I.waitInUrl('/help', 5)
    I.waitForText('Help', 5, 'div.page-main-content h1')
  }
}
