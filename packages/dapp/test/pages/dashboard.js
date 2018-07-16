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
    I.waitForVisible('div.account-view', 5)
    I.waitForVisible('div.navigation-view', 5)
    I.waitForVisible(`a[href='${dashboardRoute}'].active`, 5)
    I.waitForVisible('div.accounts-panel', 5)
    I.waitForVisible('div.vault-list', 5)
    I.moveCursorTo('div.icon')
    I.see('List of all accounts')
  }
}
