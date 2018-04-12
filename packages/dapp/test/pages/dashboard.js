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
    I.see('RigoBlock')
  },

  navigateToPreferences() {
    I.click('Preferences')
  },

  navigateToHelp() {
    I.click('Help')
  }
}
