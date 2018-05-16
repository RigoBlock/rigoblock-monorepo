Feature('Help')

Scenario('test correct render', (help, navigation) => {
  navigation.navigateToHelp()
  help.assertImOnPage()
})
