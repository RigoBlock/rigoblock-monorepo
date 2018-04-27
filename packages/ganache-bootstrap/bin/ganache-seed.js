#! /usr/bin/env node
const c = require('chalk')
const seed = require('../seed')
const { GANACHE_URL } = require('../constants')
const logger = require('./logger')

seed(GANACHE_URL).catch(e => {
  logger.error(c.red(`Error during seed: ${e.stack}`))
  process.exit(1)
})
