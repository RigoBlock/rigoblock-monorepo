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

  changeTimezoneValue(timezone) {
    I.waitForVisible('div[id="1-toggle"]')
    I.betterClick('div[id="1-toggle"]')
    I.executeScript(
      () =>
        (document.querySelector('ul[id="1-menu-options"]').style.overflow =
          'visible')
    )
    I.betterClick(`div[data-value="${timezone}"]`)
  },

  submitForm() {
    I.betterClick('div.call-to-action button[type="submit"]')
  },

  checkTimezoneHasChanged(timezone) {
    I.seeTextEquals(
      `${timezone}\nkeyboard_arrow_down\n`,
      'div.md-select-field__toggle'
    )
  },

  resetForm() {
    I.betterClick('div.call-to-action button[type="button"]')
  }
}
