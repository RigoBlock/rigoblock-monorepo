'use strict'
// in this file you can append custom step methods to 'I' object

module.exports = function() {
  return actor({
    // Define custom steps here, use 'this' to access default methods of I.
    // It is recommended to place a general 'login' function here.
    betterClick: function(element) {
      console.log('HEREEE', element)
      return this.executeScript(el => {
        console.log('HERE IS THE ELEMENT', el)
        console.log('I AM NOT UNDEFINED', document.querySelector(el))
        return document.querySelector(el).click()
      }, element)
    }
  })
}
