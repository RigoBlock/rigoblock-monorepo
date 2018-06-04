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

  async changeTimezoneValue() {
    I.click('div.md-select-field__toggle')
    I.waitForElement('ul[role="listbox"]')
    const id = await I.grabAttributeFrom('div[role="option"]', 'data-id')
    let timezone = await I.grabTextFrom(`div[data-id="${id}"]`)
    I.click(`div[data-id="${id}"]`)
    return timezone.trim()
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
