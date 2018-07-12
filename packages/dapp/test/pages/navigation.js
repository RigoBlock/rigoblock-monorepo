let I

module.exports = {
  _init() {
    I = require('../steps')()
  },

  async navigateToPreferences() {
    I.cssClick('a[href="/preferences"]')
  },

  async navigateToHelp() {
    I.cssClick('a[href="/help"]')
  },

  async navigateToDashboard() {
    I.cssClick('div.navigation-view a[href="/"]')
  },

  async navigateToVaults() {
    I.cssClick('a[href="/vaults"]')
  },

  async navigateToDragos() {
    I.cssClick('a[href="/dragos"]')
  }
}
