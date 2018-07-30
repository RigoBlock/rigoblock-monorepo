Feature('Dragos').retry(3)

Scenario('test correct dragos render', dragos => {
  dragos.navigateTo()
  dragos.assertImOnPage()
})
