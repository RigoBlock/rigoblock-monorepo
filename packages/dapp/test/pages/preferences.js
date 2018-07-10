let I

module.exports = {
  _init() {
    I = require('../steps')()
  },

  navigateTo() {
    I.amOnPage('/preferences')
  },

  assertImOnPage() {
    I.waitInUrl('/preferences', 5)
    I.waitForText('Preferences', 'h1')
  },

  async grabTimezoneValue() {
    let timezone = await I.grabTextFrom('.md-icon-text')
    return timezone.trim()
  },

  async changeTimezoneValue(timezone) {
    I.waitForVisible('div[id="1-toggle"]')
    await I.click('div[id="1-toggle"]')
    I.waitForVisible('ul[id="1-menu-options"]')
    I.executeScript(() => {
      return (document.querySelector('ul[id="1-menu-options"]').style.overflow =
        'visible')
    })
    I.click(`div[data-value="${timezone}"]`)
  },

  submitForm() {
    I.click('Save')
  },

  checkTimezoneHasChanged(timezone) {
    I.seeTextEquals(
      `${timezone}\nkeyboard_arrow_down\n`,
      'div.md-select-field__toggle'
    )
  },

  resetForm() {
    I.click('Cancel')
  }
}
