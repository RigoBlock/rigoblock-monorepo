let I

module.exports = {
  _init() {
    I = require('../steps')()
  },

  // login page doesn't use navigateToUrl, amOnPage will create
  // a new page and remove the window.web3 inject
  navigateTo() {
    I.amOnPage('/login')
  },

  assertImOnPage() {
    I.waitInUrl('/login', 5)
    I.waitForText('Hello there!', 5, 'h1')
  }
}
