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
    I.waitInUrl('/')
    I.seeElement('div.account-view')
    I.seeElement('div.navigation-view')
    I.seeElement(`a[href='${dashboardRoute}'].active`)
    I.seeElement('div.accounts-panel')
    I.seeElement('div.vault-list')
    I.moveCursorTo('div.icon')
    I.see('List of all accounts')
  }
}
