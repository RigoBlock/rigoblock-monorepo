Feature('Dashboard')

Scenario('test correct render', dashboard => {
  dashboard.assertImOnPage()
})

Scenario(
  'test navigation view functionality',
  (dashboard, dragos, vaults, navigation) => {
    dashboard.assertImOnPage()
    navigation.navigateToVaults()
    vaults.assertImOnPage()
    navigation.navigateToDragos()
    dragos.assertImOnPage()
    navigation.navigateToDashboard()
    dashboard.assertImOnPage()
  }
)
