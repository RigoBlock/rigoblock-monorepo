Feature('Dragos')

Scenario('test correct dragos render', (dragos, navigation) => {
  navigation.navigateToDragos()
  dragos.assertImOnPage()
})
