Feature('Vaults')

Scenario('test correct vaults render', (vaults, navigation, dashboard) => {
  dashboard.assertImOnPage()
  navigation.navigateToVaults()
  vaults.assertImOnPage()
  vaults.testVaultSelect()
})
