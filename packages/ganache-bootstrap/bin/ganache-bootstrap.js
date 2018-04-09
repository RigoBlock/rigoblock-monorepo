#! /usr/bin/env node
const bootstrap = require('../bootstrap')
const { GANACHE_URL } = require('../constants')

bootstrap(GANACHE_URL).catch(e => console.error('Error', e))
