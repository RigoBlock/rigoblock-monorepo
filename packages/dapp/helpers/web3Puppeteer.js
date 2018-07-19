'use strict'
const Helper = codecept_helper
const fs = require('fs-extra')
const ganache = require('ganache-cli')
const mnemonic = require('../package.json').config.mnemonic

class Web3Puppeteer extends Helper {
  constructor() {
    super()
    this.ganache = null
  }

  async _before() {
    fs.emptyDirSync('./ganache-db')
    console.log('Database directory emptied.')
    fs.copySync('./ganache-backup', './ganache-db')
    console.log('Ganache backup restored')
    this.ganache = ganache.server({
      mnemonic,
      db_path: './ganache-db',
      port: 8545,
      network_id: 5777
    })
    this.ganache.listen(
      8545,
      err =>
        err
          ? console.error('Error occurred during Ganache startup', err)
          : console.log('Ganache starting!')
    )
    await this.helpers['Puppeteer'].amOnPage('/login')
    await this.inject()
    await this.helpers['Puppeteer'].page.waitForNavigation()
  }

  async _after() {
    const closeGanachePromise = new Promise((resolve, reject) => {
      this.ganache.close(
        err =>
          err
            ? reject(new Error(err))
            : resolve(console.log('Ganache stopping...'))
      )
    })
    await closeGanachePromise
    this.ganache = null
    return
  }

  async inject() {
    const web3Raw = fs.readFileSync('../../node_modules/web3/dist/web3.min.js')
    const page = this.helpers['Puppeteer'].page
    await page.evaluate(web3Raw => {
      eval(web3Raw)
      window.web3 = new window.Web3(
        new window.Web3.providers.HttpProvider('http://localhost:8545/node')
      )
      window.init()
    }, web3Raw)
  }
}

module.exports = Web3Puppeteer
