Feature('Help')

Scenario('test correct div render', (I, help, navigation, dashboard) => {
  dashboard.assertImOnPage()
  navigation.navigateToHelp()
  help.assertImOnPage()
})
