Feature('div')

Scenario('test correct div render', I => {
  I.amOnPage('/')
  I.see('RigoBlock', 'h1')
})
