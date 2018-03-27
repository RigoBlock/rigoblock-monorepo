Feature('div')

Scenario('test correct div render', (I, dashboard) => {
  I.amOnPage('/')
  dashboard.assertImOnPage()
})

Scenario('test correct navigation to vault page', (I, dashboard) => {
  I.amOnPage('/')
  dashboard.navigateToVault()
})
