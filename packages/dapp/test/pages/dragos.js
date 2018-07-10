const dragosRoute = '/dragos'

let I

module.exports = {
  _init() {
    I = require('../steps')()
  },

  navigateTo() {
    I.amOnPage('/dragos')
  },

  assertImOnPage() {
    I.waitInUrl('/dragos')
    I.waitForText('Dragos', 'h1')
    I.waitForVisible('div.account-view')
    I.waitForVisible('div.navigation-view')
    I.waitForVisible(`a[href='${dragosRoute}'].active`)
  }
}
