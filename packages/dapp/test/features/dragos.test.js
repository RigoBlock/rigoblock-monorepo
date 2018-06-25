Feature('Dragos')

Scenario('test correct render', (dragos, navigation) => {
  navigation.navigateToDragos()
  dragos.assertImOnPage()
})
