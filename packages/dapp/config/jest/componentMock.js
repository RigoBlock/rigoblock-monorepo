'use strict'

module.exports = {
  process(src, filename) {
    return `module.exports = function () { return 'SVG image ${filename}' }`
  }
}
