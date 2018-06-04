Feature('Preferences')

Scenario('test correct render', (preferences, navigation) => {
  navigation.navigateToPreferences()
  preferences.assertImOnPage()
})

Scenario(
  'test timezone field functionality',
  async (preferences, navigation) => {
    navigation.navigateToPreferences()
    preferences.assertImOnPage()
    const timezone = await preferences.changeTimezoneValue()
    preferences.submitForm()
    navigation.navigateToDashboard()
    navigation.navigateToPreferences()
    preferences.checkTimezoneHasChanged(timezone)
  }
)

Scenario(
  'test cancel button functionality',
  async (preferences, navigation) => {
    navigation.navigateToPreferences()
    preferences.assertImOnPage()
    const defaultTimezone = await preferences.grabTimezoneValue()
    const newTimezone = await preferences.changeTimezoneValue()
    preferences.checkTimezoneHasChanged(newTimezone)
    preferences.resetForm()
    preferences.checkTimezoneHasChanged(defaultTimezone)
  }
)
