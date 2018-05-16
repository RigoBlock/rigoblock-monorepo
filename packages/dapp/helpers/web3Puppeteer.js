'use strict'
const Helper = codecept_helper
const fs = require('fs')

class Web3Puppeteer extends Helper {
  async _before() {
    await this.helpers['Puppeteer'].amOnPage('/login')
    await this.inject()
    await this.helpers['Puppeteer'].page.waitForNavigation()
  }
  async inject() {
    const web3Raw = fs.readFileSync('../../node_modules/web3/dist/web3.min.js')
    const page = this.helpers['Puppeteer'].page
    await page.evaluate(function(web3Raw) {
      eval(web3Raw)
      window.web3 = new window.Web3(
        new window.Web3.providers.HttpProvider('http://localhost:8545/node')
      )
      window.init()
    }, web3Raw)
  }
}

module.exports = Web3Puppeteer
