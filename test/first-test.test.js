Feature('div')

Scenario('test correct div render', I => {
  I.amOnPage('/')
  I.see('RigoBlock', 'div')
})
