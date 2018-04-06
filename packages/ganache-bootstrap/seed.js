module.exports = async (accList, contracts) => {
  const {
    authority,
    dragoRegistry,
    vaultEventful,
    vaultFactory,
    dragoEventful,
    dragoFactory
  } = contracts

  const vaultFactoryInstance = new web3.eth.Contract(
    vaultFactory.abi,
    vaultFactory.address
  )
  const vault = await vaultFactoryInstance.methods
    .createVault('myVault', 'TMP')
    .call()
}
