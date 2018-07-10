const dashboardRoute = '/'

let I

module.exports = {
  _init() {
    I = require('../steps')()
  },

  navigateTo() {
    I.amOnPage('/')
  },

  assertImOnPage() {
    I.waitInUrl('/', 5)
    I.waitForVisible('div.account-view')
    I.waitForVisible('div.navigation-view')
    I.waitForVisible(`a[href='${dashboardRoute}'].active`)
    I.waitForVisible('div.accounts-panel')
    I.waitForVisible('div.vault-list')
    I.moveCursorTo('div.icon')
    I.waitForVisible('div.tooltip-container')
  }
}
