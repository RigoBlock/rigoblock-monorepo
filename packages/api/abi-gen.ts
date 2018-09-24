const Handlebars = require('handlebars')

Handlebars.registerHelper('getAbi', (ctor, events, methods) => {
  const abi = [ctor, ...events, ...methods]
  const nuovo = JSON.stringify(abi, null, 2)
  console.log(nuovo)
  return nuovo
})

const abiGen = require('@0xproject/abi-gen')

