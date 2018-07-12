let I

module.exports = {
  _init() {
    I = require('../steps')()
  },

  navigateTo() {
    I.amOnPage('/login')
  },

  assertImOnPage() {
    I.waitInUrl('/login', 5)
    I.waitForText('Hello there!', 'h1')
  }
}
