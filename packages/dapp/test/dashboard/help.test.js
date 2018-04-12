Feature('Help')

Scenario('test correct div render', (I, help) => {
  help.navigateTo()
  help.assertImOnPage()
})
