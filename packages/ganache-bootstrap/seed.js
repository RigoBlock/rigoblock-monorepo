const Web3 = require('web3')
const protocol = require('@rigoblock/protocol').default
const logger = require('./logger')

module.exports = async network => {
  let receipt
  const defaultOptions = {
    gas: 4700000 // TODO: estimate gas
  }
  const web3 = new Web3(new Web3.providers.HttpProvider(network))
  const networkId = await web3.eth.net.getId()
  const accounts = await web3.eth.getAccounts()
  const contractsMap = await protocol(networkId)
  const vaultFactoryInstance = new web3.eth.Contract(
    contractsMap['VaultFactory'].abi,
    contractsMap['VaultFactory'].address,
    defaultOptions
  )

  const name = 'myVault'
  const symbol = 'RNG'

  logger.info(`Vault name: ${name} - symbol: ${symbol}`)
  // Create dummy vault
  const vaultOptions = [name, symbol]

  // TODO use this
  // const estimatedGas = await vaultFactoryInstance.methods
  //   .createVault(...vaultOptions)
  //   .estimateGas()

  receipt = await vaultFactoryInstance.methods
    .createVault(...vaultOptions)
    .send({
      from: accounts[0]
    })

  const vaultCreatedData = receipt.events.VaultCreated.returnValues

  // myVault seed
  const vaultInstance = new web3.eth.Contract(
    contractsMap['Vault'].abi,
    vaultCreatedData.vault,
    defaultOptions
  )

  await vaultInstance.methods.buyVault().send({
    from: accounts[0],
    value: Web3.utils.toWei('2')
  })

  await vaultInstance.methods.buyVault().send({
    from: accounts[0],
    value: Web3.utils.toWei('3')
  })

  const ETH_IN_MICRO = 10 ** 6

  await vaultInstance.methods.sellVault(1 * ETH_IN_MICRO).send({
    from: accounts[0]
  })

  const balance = await vaultInstance.methods.balanceOf(accounts[0]).call({
    from: accounts[0]
  })

  logger.info('Balance in ETH', balance / ETH_IN_MICRO)
}
