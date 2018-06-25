const vaultsRoute = '/vaults'

let I

module.exports = {
  _init() {
    I = require('../steps')()
  },

  navigateTo() {
    I.amOnPage('/vaults')
  },

  assertImOnPage() {
    I.waitInUrl('/vaults')
    I.waitForText('Vaults', 'h1')
    I.seeElement('div.account-view')
    I.seeElement('div.navigation-view')
    I.seeElement(`a[href='${vaultsRoute}'].active`)
  }
}
