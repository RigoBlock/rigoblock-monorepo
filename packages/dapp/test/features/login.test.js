Feature('Login').retry(3)

Scenario('test correct login render', login => {
  login.navigateTo()
  login.assertImOnPage()
})
