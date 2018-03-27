Feature('navigation')

Scenario('correctly navigate from one page to another', I => {
  I.amOnPage('/')
  I.click('.link')
  I.amOnPage('/counter')
  I.click('.link')
  I.amOnPage('/')
})
