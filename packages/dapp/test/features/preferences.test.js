Feature('Preferences').retry(3)

Scenario('test correct preferences render', preferences => {
  preferences.navigateTo()
  preferences.assertImOnPage()
})

Scenario('test timezone field functionality', (preferences, dashboard) => {
  preferences.navigateTo()
  preferences.assertImOnPage()
  preferences.changeTimezoneValue('GMT +07:00')
  preferences.submitForm()
  dashboard.navigateTo()
  preferences.navigateTo()
  preferences.checkTimezoneHasChanged('GMT +07:00')
})

Scenario('test cancel button functionality', async preferences => {
  preferences.navigateTo()
  preferences.assertImOnPage()
  const defaultTimezone = await preferences.grabTimezoneValue()
  preferences.changeTimezoneValue('GMT +07:00')
  preferences.checkTimezoneHasChanged('GMT +07:00')
  preferences.resetForm()
  preferences.checkTimezoneHasChanged(defaultTimezone)
})
