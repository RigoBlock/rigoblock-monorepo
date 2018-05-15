let I

module.exports = {
  _init() {
    I = require('../steps')()
  },

  navigateTo() {
    I.inject()
    I.amOnPage('/preferences')
  },

  assertImOnPage() {
    I.waitInUrl('/preferences')
    I.see('Preferences', 'h1')
  }
}
