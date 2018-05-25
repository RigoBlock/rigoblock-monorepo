Feature('Preferences')

Scenario('test correct render', (preferences, navigation) => {
  navigation.navigateToPreferences()
  preferences.assertImOnPage()
})

Scenario('test form functionality', (preferences, navigation) => {
  navigation.navigateToPreferences()
  preferences.assertImOnPage()
  preferences.changeFormValue()
  navigation.navigateToDashboard()
  navigation.navigateToPreferences()
  preferences.checkFormHasChanged()
})
