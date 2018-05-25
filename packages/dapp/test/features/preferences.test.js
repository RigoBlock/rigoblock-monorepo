Feature('Preferences')

Scenario('test correct render', (preferences, navigation) => {
  navigation.navigateToPreferences()
  preferences.assertImOnPage()
})

Scenario('test timezone field functionality', (preferences, navigation) => {
  navigation.navigateToPreferences()
  preferences.assertImOnPage()
  preferences.changeTimezoneValue('GMT +03:00')
  preferences.submitForm()
  navigation.navigateToDashboard()
  navigation.navigateToPreferences()
  preferences.checkTimezoneHasChanged('GMT +03:00')
})

Scenario(
  'test cancel button functionality',
  async (preferences, navigation) => {
    navigation.navigateToPreferences()
    preferences.assertImOnPage()
    const defaultValue = await preferences.grabTimezoneDefaultValue()
    preferences.changeTimezoneValue('GMT +03:00')
    preferences.checkTimezoneHasChanged('GMT +03:00')
    preferences.resetForm()
    preferences.checkTimezoneHasChanged(defaultValue)
  }
)
