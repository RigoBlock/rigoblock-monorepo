Feature('Navigation')

Scenario(
  'test correct navigation to preferences page',
  (I, navigation, dashboard, preferences) => {
    dashboard.navigateTo()
    navigation.navigateToPreferences()
    preferences.assertImOnPage()
  }
)

Scenario(
  'test correct navigation to help page',
  (I, navigation, dashboard, help) => {
    dashboard.navigateTo()
    navigation.navigateToHelp()
    help.assertImOnPage()
  }
)

Scenario(
  'test correct navigation to dashboard page',
  (I, navigation, dashboard, preferences) => {
    preferences.navigateTo()
    navigation.navigateToDashboard()
    dashboard.assertImOnPage()
  }
)
