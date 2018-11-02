import * as crypto from 'crypto'
import * as hashes from 'jshashes'

const secret = 'abdcgegergsd'

const hash = crypto.createHmac('sha1', secret).digest('hex')
const SHA1 = new hashes.SHA1()
const hash2 = SHA1.hex(secret)

console.log(hash)
console.log(hash2)
