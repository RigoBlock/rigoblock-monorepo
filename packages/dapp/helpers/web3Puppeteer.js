'use strict'
let Helper = codecept_helper

class Web3Puppeteer extends Helper {
  async _before() {
    // TODO:
    // find a way to inject web3
    // see https://blog.neufund.org/how-not-to-lose-millions-of-dollars-in-your-ico-end-to-end-testing-for-dapps-f10b8becef7e
  }
}

module.exports = Web3Puppeteer
