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
    I.see('DAS', 'div.title.large')
    I.cssClick("div.list-item[id='0']")
    I.waitUrlEquals('/vaults/0')
    I.see('ASD', 'div.title.large')
  },

  async createNewVault(name, symbol) {
    I.waitNumberOfVisibleElements('div.list-item', 2, 5)
    await I.createVault(name, symbol)
    I.waitNumberOfVisibleElements('div.list-item', 3, 10)
    I.cssClick("div.list-item[id='4']")
    I.waitUrlEquals('/vaults/4')
    I.see(symbol, 'div.title.large')
    I.see('No transactions found.', 'div.table-replacer')
  },

  async depositToVault() {
    const vaultId = 2
    const amount = '32.18'
    I.cssClick(`div.list-item[id='${vaultId}']`)
    await I.buyVault(vaultId, amount)
    I.waitForText('53.52', 5)
    I.waitForText(amount, 5)
  },

  assertAccountValue(val) {
    I.cssClick('div.navigation-view a[href="/"]')
    I.waitForVisible('div.accounts-panel', 5)
    I.waitForText(val, 5)
  }
}
