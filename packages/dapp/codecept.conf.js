const config = {
  output: './output',
  helpers: {
    Puppeteer: {
      url: 'http://localhost:8080',
      show: true
    }
  },
  include: {
    I: './test/steps.js',
    dashboard: './test/pages/dashboard.js',
    vault: './test/pages/vault.js'
  },
  mocha: {},
  bootstrap: false,
  teardown: null,
  hooks: [],
  tests: './test/**/*.test.js',
  timeout: 10000,
  name: 'rigoblock-dapp'
}

module.exports = { config }
