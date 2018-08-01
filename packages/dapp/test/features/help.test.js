Feature('Help').retry(3)

Scenario('test correct help render', help => {
  help.navigateTo()
  help.assertImOnPage()
})
