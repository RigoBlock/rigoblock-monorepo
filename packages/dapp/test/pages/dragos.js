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
    I.seeElement('div.account-view')
    I.seeElement('div.navigation-view')
    I.seeElement(`a[href='${dragosRoute}'].active`)
  }
}
