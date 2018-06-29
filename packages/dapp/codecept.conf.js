const config = {
  output: './output',
  helpers: {
    Puppeteer: {
      url: 'http://localhost:8080',
      show: true,
      chrome: {
        headless: true
      },
      waitForTimeout: 3000,
      waitForNavigation: 'domcontentloaded'
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
    login: './test/pages/login.js',
    vaults: './test/pages/vaults.js',
    dragos: './test/pages/dragos.js'
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
