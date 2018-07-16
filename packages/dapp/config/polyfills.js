'use strict'

if (typeof Promise === 'undefined') {
  // Rejection tracking prevents a common issue where React gets into an
  // inconsistent state due to an error, but it gets swallowed by a Promise,
  // and the user has no idea what causes React's erratic future behavior.
  require('promise/lib/rejection-tracking').enable()
  window.Promise = require('promise/lib/es6-extensions.js')
}

// fetch() polyfill for making API calls.
require('whatwg-fetch')

// Object.assign() is commonly used with React.
// It will use the native implementation if it's present and isn't buggy.
Object.assign = require('object-assign')

// In tests, polyfill requestAnimationFrame since jsdom doesn't provide it yet.
// We don't polyfill it in the browser--this is user's responsibility.
if (process.env.NODE_ENV === 'test') {
  require('raf').polyfill(global)
}

Object.values = Object.values
  ? Object.values
  : function(obj) {
      const allowedTypes = [
        '[object String]',
        '[object Object]',
        '[object Array]',
        '[object Function]'
      ]
      const objType = Object.prototype.toString.call(obj)

      if (obj === null || typeof obj === 'undefined') {
        throw new TypeError('Cannot convert undefined or null to object')
      } else if (!~allowedTypes.indexOf(objType)) {
        return []
      } else {
        // if ES6 is supported
        if (Object.keys) {
          return Object.keys(obj).map(key => obj[key])
        }

        let result = []
        for (let prop in obj) {
          if (obj.hasOwnProperty(prop)) {
            result.push(obj[prop])
          }
        }

        return result
      }
    }
