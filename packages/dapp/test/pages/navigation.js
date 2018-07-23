let I

module.exports = {
  _init() {
    I = require('../steps')()
  },

  navigateToPreferences() {
    I.cssClick('a[href="/preferences"]')
    I.waitInUrl('/preferences', 5)
  },

  navigateToHelp() {
    I.cssClick('a[href="/help"]')
    I.waitInUrl('/help', 5)
  },

  navigateToDashboard() {
    I.cssClick('div.navigation-view a[href="/"]')
    I.waitUrlEquals('http://localhost:8080/', 5)
  },

  navigateToVaults() {
    I.cssClick('a[href="/vaults"]')
    I.waitInUrl('/vaults/0', 5)
  },

  navigateToDragos() {
    I.cssClick('a[href="/dragos"]')
    I.waitInUrl('/dragos', 5)
  }
}
