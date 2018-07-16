Feature('Dashboard').retry(3)

Scenario('test correct dashboard render', dashboard => {
  dashboard.assertImOnPage()
})

Scenario(
  'test navigation view functionality',
  (dashboard, dragos, vaults, navigation) => {
    navigation.navigateToVaults()
    vaults.assertImOnPage()
    navigation.navigateToDragos()
    dragos.assertImOnPage()
    navigation.navigateToDashboard()
    dashboard.assertImOnPage()
  }
)
