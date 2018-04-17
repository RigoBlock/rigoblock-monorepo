Feature('login')

Scenario('test correct render', (I, login) => {
  login.navigateTo()
  login.assertImOnPage()
})
