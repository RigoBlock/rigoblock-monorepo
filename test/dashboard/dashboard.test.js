Feature('div')

Scenario('test correct div render', (I, dashboard) => {
  dashboard.navigateTo()
  dashboard.assertImOnPage()
})

Scenario('test correct navigation to vault page', (I, dashboard, vault) => {
  dashboard.navigateTo()
  dashboard.navigateToVault()
  vault.assertImOnPage()
})
