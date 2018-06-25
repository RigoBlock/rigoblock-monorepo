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
    I.waitForText('Dashboard', 'h1')
    I.seeElement('div.account-view')
    I.seeElement('div.navigation-view')
    I.seeElement(`a[href='${dashboardRoute}'].active`)
  }
}
