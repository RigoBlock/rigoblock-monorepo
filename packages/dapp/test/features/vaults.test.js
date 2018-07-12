Feature('Vaults')

Scenario('test correct vaults render', (vaults, navigation) => {
  navigation.navigateToVaults()
  vaults.assertImOnPage()
  vaults.testVaultSelect()
})
