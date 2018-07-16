'use strict'
// in this file you can append custom step methods to 'I' object

module.exports = function() {
  return actor({
    // Define custom steps here, use 'this' to access default methods of I.
    // It is recommended to place a general 'login' function here.
    cssClick: function(element) {
      this.waitForVisible(element, 5)
      return this.executeScript(
        el => document.querySelector(el).click(),
        element
      )
    }
  })
}
