Feature('Navigation')

Scenario(
  'test correct navigation to preferences page',
  (I, navigation, dashboard, preferences) => {
    dashboard.assertImOnPage()
    navigation.navigateToPreferences()
    preferences.assertImOnPage()
  }
)

Scenario(
  'test correct navigation to help page',
  (I, navigation, dashboard, help) => {
    dashboard.assertImOnPage()
    navigation.navigateToHelp()
    help.assertImOnPage()
  }
)

Scenario(
  'test correct navigation to dashboard page',
  (I, navigation, dashboard, help) => {
    dashboard.assertImOnPage()
    navigation.navigateToHelp()
    help.assertImOnPage()
    navigation.navigateToDashboard()
    dashboard.assertImOnPage()
  }
)
