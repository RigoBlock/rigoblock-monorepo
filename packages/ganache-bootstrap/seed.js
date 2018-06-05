const seedVaults = require('./seedVaults')

module.exports = async network => {
  await seedVaults(network)
}
