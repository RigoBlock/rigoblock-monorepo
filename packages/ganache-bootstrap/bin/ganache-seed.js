#! /usr/bin/env node
const seed = require('../seed')
const { GANACHE_URL } = require('../constants')

seed(GANACHE_URL).catch(e => console.error('Error', e))
