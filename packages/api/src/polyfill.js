if (typeof Promise === 'undefined') {
  require('es6-promise').polyfill()
}

if (typeof fetch === 'undefined') {
  require('isomorphic-fetch')
}
