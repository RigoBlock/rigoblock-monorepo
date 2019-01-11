const Handlebars = require('handlebars')

Handlebars.registerHelper('getAbi', (ctor, events, methods) =>
  JSON.stringify([ctor, ...events, ...methods], null, 2)
)

module.exports = Handlebars
