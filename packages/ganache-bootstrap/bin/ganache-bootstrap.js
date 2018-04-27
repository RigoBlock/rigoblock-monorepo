#! /usr/bin/env node
const c = require('chalk')
const bootstrap = require('../bootstrap')
const { GANACHE_URL } = require('../constants')
const logger = require('./logger')

bootstrap(GANACHE_URL).catch(e => {
  logger.error(c.red(`Error during bootstrap: ${e.stack}`))
  process.exit(1)
})
