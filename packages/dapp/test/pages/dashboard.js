let I

module.exports = {
  _init() {
    I = require('../steps')()
  },

  navigateTo() {
    I.inject()
    I.amOnPage('/')
  },

  assertImOnPage() {
    I.waitInUrl('/')
    I.see('RigoBlock')
  }
}
