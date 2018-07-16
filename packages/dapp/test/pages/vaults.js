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
    I.waitInUrl('/vaults', 5)
    I.waitForVisible('div.account-view', 5)
    I.waitForVisible('div.navigation-view', 5)
    I.waitForVisible(`a[href='${vaultsRoute}'].active`, 5)
    I.waitForVisible('div.vault-select', 5, 5)
    I.waitNumberOfVisibleElements('div.list-item', 2, 5)
  },

  testVaultSelect() {
    I.cssClick("div.list-item[id='2']")
    I.waitUrlEquals('/vaults/2')
    I.cssClick("div.list-item[id='0']")
    I.waitUrlEquals('/vaults/0')
  }
}
