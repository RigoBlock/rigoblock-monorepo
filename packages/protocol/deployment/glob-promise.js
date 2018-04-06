const glob = require('glob')

module.exports = path => {
  return new Promise((resolve, reject) => {
    glob(path, null, (err, result) => {
      if (err) {
        return reject(err)
      }
      resolve(result)
    })
  })
}
