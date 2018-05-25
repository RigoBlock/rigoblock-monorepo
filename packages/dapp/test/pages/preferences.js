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

  changeTimezoneValue(val) {
    I.click('#\\31-menu')
    I.click(`div[data-value="${val}"]`)
  },

  submitForm() {
    I.click('Save')
  },

  checkTimezoneHasChanged(val) {
    I.seeTextEquals(`${val}\nkeyboard_arrow_down\n`, '#\\31-menu')
  },

  resetForm() {
    I.click('Cancel')
  }
}
