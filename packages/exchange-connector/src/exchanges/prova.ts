import fetch from 'node-fetch'
import nock from 'nock'
import test from '../nockCalls/0xStandardGetOrderbook.json'

// 'https://www.facebook.com/FedericoIlrosso'

// nock('https://www.facebook.com/')
//   .get('/FedericoIlrosso')
//   .reply(200, {
//     _id: '123ABC',
//     _rev: '946B7D1C',
//     username: 'pgte',
//     email: 'pedro.teixeira@gmail.com'
//   })

console.log(test)

const getData = async () => {
  nock('http://example.com')
    .get('/path')
    .reply(200, {
      name: 'whaaa'
    })
  const result = await fetch('http://example.com/path').then(r => r.json())
  // console.log(result)
}

getData()

console.log(__dirname)
const nockdefs = nock.loadDefs(
  __dirname + '../nockCalls/0xStandardGetOrders.json'
)
console.log('HERE', nockdefs)
