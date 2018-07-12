Feature('Help')

Scenario('test correct help render', (help, navigation, dashboard) => {
  dashboard.assertImOnPage()
  navigation.navigateToHelp()
  help.assertImOnPage()
})
