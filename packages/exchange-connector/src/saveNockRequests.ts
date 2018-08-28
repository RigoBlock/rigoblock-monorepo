import fetch from 'node-fetch'
import nock from 'nock'

// const getData = async () => {

//   await http.get('https://api.ercdex.com/api/standard/1/v0/token_pairs')

// }

// getData()
const getData = async () => {
  nock.recorder.rec({
    output_objects: true,
    dont_print: true
  })
  await fetch(
    'https://api.ercdex.com/api/standard/1/v0/orderbook?baseTokenAddress=0xe41d2489571d322189246dafa5ebde1f4699f498&quoteTokenAddress=0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
  )

  await fetch('https://api.ercdex.com/api/standard/1/v0/token_pairs')

  await fetch('https://api.ercdex.com/api/standard/1/v0/orders')

  await fetch(
    'https://api.ercdex.com/api/standard/1/v0/order/0x7109947a8f4c595f2604445cc4cfc0927fcef5b84b9b33a34528ada629dbd846'
  )

  let nockCallObjects = nock.recorder.play()
  console.log('HERE', nockCallObjects)
}

getData()
