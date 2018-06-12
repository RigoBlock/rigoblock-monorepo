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
  const ETH_IN_MICRO = 10 ** 6

  // const vault1options = ['First Vault', 'ASD']
  // const vault2options = ['Second Vault', 'SAD']
  // const vault3options = ['Third Vault', 'DAS']
  // const vault4options = ['Fourth Vault', 'ADS']
  const vault1options = ['Fifth Vault', 'BAF']
  const vault2options = ['6 Vault', 'ABF']
  const vault3options = ['7 Vault', 'FAB']
  const vault4options = ['8 Vault', 'AFB']

  logger.info('options', vault1options)

  // TODO use this
  // const estimatedGas = await vaultFactoryInstance.methods
  //   .createVault(...vaultOptions)
  //   .estimateGas()

  // first vault

  receipt = await vaultFactoryInstance.methods
    .createVault(...vault1options)
    .send({
      from: accounts[0]
    })

  let vaultCreatedData = receipt.events.VaultCreated.returnValues
  logger.info(
    `First vault - name: ${vaultCreatedData.name}, symbol: ${
      vaultCreatedData.symbol
    }`
  )

  const vaultInstance1 = new web3.eth.Contract(
    contractsMap['Vault'].abi,
    vaultCreatedData.vault,
    defaultOptions
  )

  // first vault seed

  await vaultInstance1.methods.buyVault().send({
    from: accounts[0],
    value: Web3.utils.toWei('10')
  })

  await vaultInstance1.methods.buyVault().send({
    from: accounts[1],
    value: Web3.utils.toWei('5')
  })

  await vaultInstance1.methods.sellVault(1 * ETH_IN_MICRO).send({
    from: accounts[0]
  })

  // second vault

  receipt = await vaultFactoryInstance.methods
    .createVault(...vault2options)
    .send({
      from: accounts[1]
    })

  vaultCreatedData = receipt.events.VaultCreated.returnValues
  logger.info(
    `Second vault - name: ${vaultCreatedData.name}, symbol: ${
      vaultCreatedData.symbol
    }`
  )

  const vaultInstance2 = new web3.eth.Contract(
    contractsMap['Vault'].abi,
    vaultCreatedData.vault,
    defaultOptions
  )

  // second vault seed

  await vaultInstance2.methods.buyVault().send({
    from: accounts[1],
    value: Web3.utils.toWei('4')
  })

  await vaultInstance2.methods.buyVault().send({
    from: accounts[2],
    value: Web3.utils.toWei('5')
  })

  await vaultInstance2.methods.buyVault().send({
    from: accounts[3],
    value: Web3.utils.toWei('6')
  })

  await vaultInstance2.methods.sellVault(1 * ETH_IN_MICRO).send({
    from: accounts[1]
  })

  await vaultInstance2.methods.sellVault(3 * ETH_IN_MICRO).send({
    from: accounts[2]
  })

  await vaultInstance2.methods.sellVault(5 * ETH_IN_MICRO).send({
    from: accounts[3]
  })

  // third vault

  receipt = await vaultFactoryInstance.methods
    .createVault(...vault3options)
    .send({
      from: accounts[1]
    })

  vaultCreatedData = receipt.events.VaultCreated.returnValues
  logger.info(
    `Third vault - name: ${vaultCreatedData.name}, symbol: ${
      vaultCreatedData.symbol
    }`
  )

  const vaultInstance3 = new web3.eth.Contract(
    contractsMap['Vault'].abi,
    vaultCreatedData.vault,
    defaultOptions
  )

  // third vault seed

  await vaultInstance3.methods.buyVault().send({
    from: accounts[0],
    value: Web3.utils.toWei('15')
  })

  await vaultInstance3.methods.buyVault().send({
    from: accounts[3],
    value: Web3.utils.toWei('7')
  })

  await vaultInstance3.methods.buyVault().send({
    from: accounts[4],
    value: Web3.utils.toWei('2')
  })

  await vaultInstance3.methods.sellVault(3 * ETH_IN_MICRO).send({
    from: accounts[0]
  })

  await vaultInstance3.methods.sellVault(1 * ETH_IN_MICRO).send({
    from: accounts[3]
  })

  // fourth vault

  receipt = await vaultFactoryInstance.methods
    .createVault(...vault4options)
    .send({
      from: accounts[1]
    })

  vaultCreatedData = receipt.events.VaultCreated.returnValues
  logger.info(
    `Third vault - name: ${vaultCreatedData.name}, symbol: ${
      vaultCreatedData.symbol
    }`
  )

  const vaultInstance4 = new web3.eth.Contract(
    contractsMap['Vault'].abi,
    vaultCreatedData.vault,
    defaultOptions
  )

  // fourth vault seed

  await vaultInstance4.methods.buyVault().send({
    from: accounts[1],
    value: Web3.utils.toWei('8')
  })

  await vaultInstance4.methods.buyVault().send({
    from: accounts[2],
    value: Web3.utils.toWei('4')
  })

  await vaultInstance4.methods.buyVault().send({
    from: accounts[4],
    value: Web3.utils.toWei('18')
  })

  const supply1 = await vaultInstance1.methods
    .totalSupply()
    .call({ from: accounts[0] })

  const supply2 = await vaultInstance2.methods
    .totalSupply()
    .call({ from: accounts[0] })

  const supply3 = await vaultInstance3.methods
    .totalSupply()
    .call({ from: accounts[0] })

  const supply4 = await vaultInstance4.methods
    .totalSupply()
    .call({ from: accounts[0] })

  logger.info(`First vault total supply: ${supply1 / ETH_IN_MICRO} ETH`)
  logger.info(`Second vault total supply: ${supply2 / ETH_IN_MICRO} ETH`)
  logger.info(`Third vault total supply: ${supply3 / ETH_IN_MICRO} ETH`)
  logger.info(`Fourth vault total supply: ${supply4 / ETH_IN_MICRO} ETH`)
}
