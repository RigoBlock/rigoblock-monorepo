Feature('Vaults')

// Scenario('test correct vaults render', (vaults, navigation) => {
//   navigation.navigateToVaults()
//   vaults.assertImOnPage()
//   vaults.testVaultSelect()
// })

// Scenario(
//   'new vault created is fetched and rendered',
//   async (navigation, vaults) => {
//     navigation.navigateToVaults()
//     await vaults.createNewVault('New Vault', 'VLT')
//   }
// )

// Scenario(
//   'vault transactions are fetched and rendered, account value is updated in real time',
//   async (navigation, vaults) => {
//     navigation.navigateToVaults()
//     await vaults.depositToVault()
//     navigation.navigateToDashboard()
//     vaults.assertAccountValue('32.64')
//   }
// )

Scenario(
  'user gets redirected to /vaults if he tries to access an invalid vault url',
  async (navigation, vaults) => {
    navigation.navigateToVaults()
    navigation.navigateToUrl('/vaults/20')
    vaults.assertImOnPage()
  }
)
