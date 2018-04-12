Feature('Preferences')

Scenario('test correct div render', (I, preferences) => {
  preferences.navigateTo()
  preferences.assertImOnPage()
})
