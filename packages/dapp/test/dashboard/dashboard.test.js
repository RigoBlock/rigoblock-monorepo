Feature('Dashboard')

Scenario('test correct div render', (I, dashboard) => {
  dashboard.navigateTo()
  dashboard.assertImOnPage()
})
