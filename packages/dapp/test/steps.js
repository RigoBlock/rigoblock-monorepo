'use strict'
// in this file you can append custom step methods to 'I' object

module.exports = function() {
  return actor({
    // Define custom steps here, use 'this' to access default methods of I.
    // It is recommended to place a general 'login' function here.
    cssClick: function(element) {
      this.waitForVisible(element)
      return this.executeScript(el => {
        console.log('ELEMENT', el)
        console.log('ELEMENT EXISTS YET', !!document.querySelector(el))
        return document.querySelector(el).click()
      }, element)
    }
  })
}
