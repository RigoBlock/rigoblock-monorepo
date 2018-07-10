let I

module.exports = {
  _init() {
    I = require('../steps')()
  },

  navigateToHome() {
    I.click('RigoBlock')
  },

  navigateToPreferences() {
    I.saveScreenshot('BeforeClick.png')
    I.click('Preferences')
    I.saveScreenshot('AfterClick.png')
  },

  navigateToHelp() {
    I.click('Help')
  },

  navigateToDashboard() {
    I.click('Dashboard')
  },

  navigateToVaults() {
    I.click('Vaults')
  },

  navigateToDragos() {
    I.click('Dragos')
  }
}
