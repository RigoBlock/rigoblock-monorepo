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
    I.seeElement('div.account-view')
    I.seeElement('div.navigation-view')
    I.seeElement(`a[href='${vaultsRoute}'].active`)
    I.seeNumberOfElements('div.list-item', 2)
    I.click("div.list-item[id='2']")
    I.waitUrlEquals('/vaults/2')
    I.click("div.list-item[id='0']")
    I.waitUrlEquals('/vaults/0')
  },

  selectVault() {}
}
