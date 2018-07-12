Feature('Help')

Scenario('test correct help render', (help, navigation) => {
  navigation.navigateToHelp()
  help.assertImOnPage()
})
