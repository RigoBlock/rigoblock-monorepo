let I

module.exports = {
  _init() {
    I = require('../steps')()
  },

  navigateTo() {
    I.amOnPage('/login')
  },

  assertImOnPage() {
    I.waitInUrl('/login')
    I.waitForText('Hello there!', 'h1')
  }
}
