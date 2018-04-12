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
    navigation: './test/pages/navigation.js',
    dashboard: './test/pages/dashboard.js',
    preferences: './test/pages/preferences.js',
    help: './test/pages/help.js'
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
