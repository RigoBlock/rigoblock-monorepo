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
    preferences.changeTimezoneValue('GMT -12:00')
    preferences.submitForm()
    navigation.navigateToHome()
    navigation.navigateToPreferences()
    preferences.checkTimezoneHasChanged('GMT -12:00')
  }
).retry(3)

Scenario(
  'test cancel button functionality',
  async (preferences, navigation) => {
    navigation.navigateToPreferences()
    preferences.assertImOnPage()
    const defaultTimezone = await preferences.grabTimezoneValue()
    preferences.changeTimezoneValue('GMT -12:00')
    preferences.checkTimezoneHasChanged('GMT -12:00')
    preferences.resetForm()
    preferences.checkTimezoneHasChanged(defaultTimezone)
  }
).retry(3)
