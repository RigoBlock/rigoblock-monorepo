Feature('Navigation').retry(3)

Scenario(
  'test correct navigation to preferences page',
  (navigation, preferences) => {
    navigation.navigateToPreferences()
    preferences.assertImOnPage()
  }
)

Scenario('test correct navigation to help page', (navigation, help) => {
  navigation.navigateToHelp()
  help.assertImOnPage()
})

Scenario(
  'test correct navigation to dashboard page',
  (navigation, dashboard, help) => {
    navigation.navigateToHelp()
    help.assertImOnPage()
    navigation.navigateToDashboard()
    dashboard.assertImOnPage()
  }
)
