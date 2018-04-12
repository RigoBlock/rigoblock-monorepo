Feature('div')

Scenario('test correct div render', (I, dashboard) => {
  dashboard.navigateTo()
  dashboard.assertImOnPage()
})

Scenario(
  'test correct navigation to preferences page',
  (I, dashboard, preferences) => {
    dashboard.navigateTo()
    dashboard.navigateToPreferences()
    preferences.assertImOnPage()
    preferences.navigateToHome()
    dashboard.assertImOnPage()
  }
)

Scenario('test correct navigation to help page', (I, dashboard, help) => {
  dashboard.navigateTo()
  dashboard.navigateToHelp()
  help.assertImOnPage()
  help.navigateToHome()
  dashboard.assertImOnPage()
})
