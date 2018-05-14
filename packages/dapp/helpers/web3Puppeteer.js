'use strict'
const Helper = codecept_helper
const fs = require('fs')

class Web3Puppeteer extends Helper {
  async _before() {
    const web3Raw = fs.readFileSync('../../node_modules/web3/dist/web3.min.js')
    this.helpers['Puppeteer'].browser.on('targetchanged', async target => {
      const targetPage = await target.page()
      targetPage.evaluate(web3Raw => {
        eval(web3Raw)
        window.web3 = new window.Web3(
          new window.Web3.providers.HttpProvider('http://localhost:8545/node')
        )
        console.log(window.web3.version.api)
      }, web3Raw)
    })
  }
}

module.exports = Web3Puppeteer
