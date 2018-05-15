const config = {
  output: './output',
  helpers: {
    Puppeteer: {
      url: 'http://localhost:8080',
      show: true,
      chrome: {
        slowMo: 200
      }
    },
    Web3Puppeteer: {
      require: './helpers/web3Puppeteer.js'
    }
  },
  include: {
    I: './test/steps.js',
    navigation: './test/pages/navigation.js',
    dashboard: './test/pages/dashboard.js',
    preferences: './test/pages/preferences.js',
    help: './test/pages/help.js',
    login: './test/pages/login.js'
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
