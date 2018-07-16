Feature('Dragos').retry(3)

Scenario('test correct dragos render', (dragos, navigation) => {
  navigation.navigateToDragos()
  dragos.assertImOnPage()
})
