Feature('Login')

Scenario('test correct render', login => {
  login.navigateTo()
  login.assertImOnPage()
})
