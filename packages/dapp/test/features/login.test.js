Feature('Login')

Scenario('test correct login render', login => {
  login.navigateTo()
  login.assertImOnPage()
})
