Feature('Vaults')

Scenario('test correct render', (vaults, navigation) => {
  navigation.navigateToVaults()
  vaults.assertImOnPage()
})
