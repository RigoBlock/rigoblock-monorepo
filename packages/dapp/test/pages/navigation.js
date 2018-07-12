let I

module.exports = {
  _init() {
    I = require('../steps')()
  },

  navigateToPreferences() {
    I.betterClick('a[href="/preferences"]')
  },

  navigateToHelp() {
    I.betterClick('a[href="/help"]')
  },

  navigateToDashboard() {
    I.betterClick('div.navigation-view a[href="/"]')
  },

  navigateToVaults() {
    I.betterClick('a[href="/vaults"]')
  },

  navigateToDragos() {
    I.betterClick('a[href="/dragos"]')
  }
}
