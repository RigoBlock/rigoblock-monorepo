let I

module.exports = {
  _init() {
    I = require('../steps')()
  },

  navigateToDashboard() {
    I.click('RigoBlock')
  },

  navigateToPreferences() {
    I.click('Preferences')
  },

  navigateToHelp() {
    I.click('Help')
  }
}
