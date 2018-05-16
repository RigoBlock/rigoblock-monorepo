Feature('Preferences')

Scenario('test correct div render', (I, preferences, navigation, dashboard) => {
  dashboard.assertImOnPage()
  navigation.navigateToPreferences()
  preferences.assertImOnPage()
})
