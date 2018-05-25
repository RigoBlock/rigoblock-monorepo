let I

module.exports = {
  _init() {
    I = require('../steps')()
  },

  navigateTo() {
    I.amOnPage('/preferences')
  },

  assertImOnPage() {
    I.waitInUrl('/preferences')
    I.waitForText('Preferences', 'h1')
  },

  changeFormValue() {
    I.click('#\\31-menu')
    I.click('div[data-value="GMT +03:00"]')
    I.click('Save')
  },

  checkFormHasChanged() {
    I.seeTextEquals('GMT +03:00\nkeyboard_arrow_down\n', '#\\31-menu')
  }
}
