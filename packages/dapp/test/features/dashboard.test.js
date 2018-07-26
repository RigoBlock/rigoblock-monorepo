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

Scenario(
  'account value is updated in real time when transactions are done',
  async (dashboard, vaults) => {
    await vaults.depositToVault('0', '32.18')
    dashboard.assertAccountValue('32.64')
  }
)
