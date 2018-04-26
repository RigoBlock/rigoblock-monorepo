#! /usr/bin/env node

// TO BE FIXED, BABEL NOT PARSING RIGOBLOCK PROTOCOL
require('babel-register')
require('babel-polyfill')

const seed = require('../seed')
const { GANACHE_URL } = require('../constants')

seed(GANACHE_URL).catch(e => console.error('Error', e))
