const fs = require('fs-extra')
const c = require('chalk')
const mnemonic = require('../package.json').config.mnemonic
const ganache = require('ganache-cli')

class Bootstrapper {
  public ganache
  constructor() {
    this.ganache = null
  }

  public async start() {
    fs.emptyDirSync(__dirname + '/../ganache-db')
    console.log(c.green('Database directory emptied.'))
    fs.copySync(__dirname + '/../ganache-backup', __dirname + '/../ganache-db')
    console.log(c.green('Ganache backup restored.'))
    this.ganache = ganache.server({
      mnemonic,
      db_path: __dirname + '/../ganache-db',
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
  }
  public async close() {
    await new Promise((resolve, reject) => {
      this.ganache.close(err => {
        if (err) {
          reject(err)
        }
        console.log('Ganache stopping...')
        return resolve({})
      })
    })
    this.ganache = null
  }
}

export default new Bootstrapper()
