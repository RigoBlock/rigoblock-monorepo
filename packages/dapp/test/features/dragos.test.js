Feature('Dragos')

Scenario('test correct dragos render', (dragos, navigation, dashboard) => {
  dashboard.assertImOnPage()
  navigation.navigateToDragos()
  dragos.assertImOnPage()
})
