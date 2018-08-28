import { back } from 'nock'

back.fixtures = __dirname + '/nock-fixtures'

if (process.env.NOCK_RECORD) {
  back.setMode('record')
}

export default (fixtureName, requestFunction) => {
  return new Promise((resolve, reject) => {
    back(fixtureName, done => {
      requestFunction()
        .then(result => {
          done()
          return result
        })
        .then(resolve)
        .catch(reject)
    })
  })
}
