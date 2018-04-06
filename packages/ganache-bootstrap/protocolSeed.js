module.exports = async (accList, contracts) => {
  const {
    authority,
    dragoRegistry,
    vaultEventful,
    vaultFactory,
    dragoEventful,
    dragoFactory
  } = contracts

  const ret = await vaultFactory.createVault('myVault', 'TMP')
}
