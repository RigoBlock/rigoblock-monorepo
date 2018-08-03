const vaultsRoute = '/vaults'

let I

module.exports = {
  _init() {
    I = require('../steps')()
  },

  navigateTo() {
    I.navigateToUrl('/vaults')
  },

  assertImOnPage() {
    I.waitInUrl('/vaults/0', 5)
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

  depositToVault(id, amount) {
    return I.buyVault(id, amount)
  },

  createNewVault(name, symbol, accountNumber) {
    const selectField = 'ul[id="0-menu-options"]'
    I.cssClick('div.vault-select > button')
    I.waitForText('Create Vault')
    I.cssClick('div[id="0-toggle"]')
    I.waitForElement(selectField)
    I.displayFullSelectField(selectField)
    I.cssClick(`div[data-value="${accountNumber}"]`)
    I.fillField("input[id='1']", name)
    I.fillField("input[id='2']", symbol)
    I.cssClick("button[type='submit']")
  },

  fillCreateVaultForm(name, symbol) {
    I.cssClick('div.vault-select > button')
    I.waitForText('Create Vault')
    I.fillField("input[id='1']", name)
    I.fillField("input[id='2']", symbol)
  },

  assertInputValues(name, symbol) {
    I.waitForValue("input[id='1']", name)
    I.waitForValue("input[id='2']", symbol)
  },

  seeErrorVaultAlreadyExists() {
    I.see('Vault already exists.', 'div.md-text-field-message')
  },

  seeErrorVaultSymbolIncorrect() {
    I.see('Vault symbol must be 3 letters.', 'div.md-text-field-message')
  },

  assertVaultExists(name, symbol, id) {
    I.waitForText(symbol, 5, `div.list-item[id="${id}"]  span.item-symbol`)
    I.waitForText(name, 5, `div.list-item[id="${id}"]  span.item-name`)
  },

  assertTransactionExists(hash) {
    I.waitForText(hash, 5)
  }
}
