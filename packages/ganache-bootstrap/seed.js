const Web3 = require('web3')
const c = require('chalk')
const protocol = require('@rigoblock/protocol').default
const logger = require('./logger')

module.exports = async network => {
  const web3 = new Web3(new Web3.providers.HttpProvider(network))
  const networkId = await web3.eth.net.getId()
  const contractsMap = await protocol(networkId)
  const vaultFactoryInstance = new web3.eth.Contract(
    contractsMap['VaultFactory'].abi,
    contractsMap['VaultFactory'].address,
    {
      gas: 4700000 // TODO: estimate gas
    }
  )

  await vaultFactoryInstance.methods.createVault('myVault', 'TMP').call()

  logger.info(c.magenta('Seed completed'))
}
