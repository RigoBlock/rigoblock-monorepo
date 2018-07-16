Feature('Help').retry(3)

Scenario('test correct help render', (help, navigation) => {
  navigation.navigateToHelp()
  help.assertImOnPage()
})
