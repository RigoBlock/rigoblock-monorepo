let I

module.exports = {
  _init() {
    I = require('../steps')()
  },

  navigateToPreferences() {
    I.cssClick('a[href="/preferences"]')
  },

  navigateToHelp() {
    I.cssClick('a[href="/help"]')
  },

  navigateToDashboard() {
    I.cssClick('div.navigation-view a[href="/"]')
  },

  navigateToVaults() {
    I.cssClick('a[href="/vaults"]')
  },

  navigateToDragos() {
    I.cssClick('a[href="/dragos"]')
  }
}
