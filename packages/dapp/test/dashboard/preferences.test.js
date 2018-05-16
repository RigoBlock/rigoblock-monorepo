Feature('Preferences')

Scenario('test correct render', (preferences, navigation) => {
  navigation.navigateToPreferences()
  preferences.assertImOnPage()
})
