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

  async grabTimezoneValue() {
    let timezone = await I.grabTextFrom('.md-icon-text')
    return timezone.trim()
  },

  changeTimezoneValue(timezone) {
    I.click('[id="1-menu"]')
    I.click(`div[data-value="${timezone}"]`)
  },

  submitForm() {
    I.click('Save')
  },

  checkTimezoneHasChanged(val) {
    I.seeTextEquals(
      `${val}\nkeyboard_arrow_down\n`,
      'div.md-select-field__toggle'
    )
  },

  resetForm() {
    I.click('Cancel')
  }
}
