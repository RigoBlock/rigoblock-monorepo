const bootstrapper = require('./bootstrapper').default

expect.extend({
  toBeHash(received) {
    try {
      if (received.substring(0, 2) === '0x' && received.length === 66) {
        return {
          message: () => `expected ${received} to be a valid Hash`,
          pass: true
        }
      }
    } catch (err) {}
    return {
      message: () => `expected ${received} to be a valid Hash`,
      pass: false
    }
  }
})

beforeAll(async () => {
  await bootstrapper.start()
})

afterAll(async () => {
  await bootstrapper.close()
})
