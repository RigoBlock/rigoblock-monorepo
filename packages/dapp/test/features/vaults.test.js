Feature('Vaults').retry(3)

const account = '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196'

Scenario('test correct vaults render', vaults => {
  vaults.navigateTo()
  vaults.assertImOnPage()
  vaults.testVaultSelect()
})

Scenario(
  'user gets redirected to /vaults if he tries to access an invalid vault url',
  (navigation, vaults) => {
    vaults.navigateTo()
    navigation.navigateToUrl('/vaults/20')
    vaults.assertImOnPage()
  }
)

Scenario(
  'vault transactions are fetched and rendered in real time',
  async vaults => {
    vaults.navigateTo()
    const txHash = await vaults.depositToVault('0', '1.00')
    const parsedHash = txHash.substring(txHash.length - 5).toUpperCase()
    vaults.assertTransactionExists(parsedHash)
  }
)

Scenario('user creates a new vault', vaults => {
  const vaultName = 'New vault'
  const vaultSymbol = 'VLT'
  vaults.navigateTo()
  vaults.createNewVault(vaultName, vaultSymbol, account)
  vaults.assertVaultExists(vaultName, vaultSymbol, 4)
})

Scenario('user cannot create a vault that already exists', vaults => {
  const vaultName = 'First vault'
  const vaultSymbol = 'ASD'
  vaults.navigateTo()
  vaults.assertVaultExists(vaultName, vaultSymbol, 0)
  vaults.createNewVault(vaultName, vaultSymbol, account)
  vaults.seeErrorVaultAlreadyExists()
})
