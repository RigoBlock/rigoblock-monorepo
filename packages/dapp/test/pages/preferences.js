let I

module.exports = {
  _init() {
    I = require('../steps')()
  },

  navigateTo() {
    I.amOnPage('/preferences')
  },

  assertImOnPage() {
    I.waitInUrl('/preferences')
    I.see('Preferences', 'h1')
  },

  navigateToHome() {
    I.click('RigoBlock')
  }
}
