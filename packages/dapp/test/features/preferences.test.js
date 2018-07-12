Feature('Preferences')

Scenario(
  'test correct preferences render',
  (preferences, navigation, dashboard) => {
    dashboard.assertImOnPage()
    navigation.navigateToPreferences()
    preferences.assertImOnPage()
  }
)

Scenario(
  'test timezone field functionality',
  (preferences, navigation, dashboard) => {
    dashboard.assertImOnPage()
    navigation.navigateToPreferences()
    preferences.assertImOnPage()
    preferences.changeTimezoneValue('GMT +07:00')
    preferences.submitForm()
    navigation.navigateToDashboard()
    navigation.navigateToPreferences()
    preferences.checkTimezoneHasChanged('GMT +07:00')
  }
)

Scenario(
  'test cancel button functionality',
  async (preferences, navigation, dashboard) => {
    dashboard.assertImOnPage()
    navigation.navigateToPreferences()
    preferences.assertImOnPage()
    const defaultTimezone = await preferences.grabTimezoneValue()
    preferences.changeTimezoneValue('GMT +07:00')
    preferences.checkTimezoneHasChanged('GMT +07:00')
    preferences.resetForm()
    preferences.checkTimezoneHasChanged(defaultTimezone)
  }
)
