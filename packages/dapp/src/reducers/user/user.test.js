import actions from '../../actions/user-actions'
import userReducer from './user'

const initialState = {
  timezone: 'GMT +02:00'
}

describe('user reducer', () => {
  const userTest = reducerTester(userReducer)

  it('returns the initial state', () => {
    userTest(
      initialState,
      {},
      {
        timezone: 'GMT +02:00'
      }
    )
  })

  it("updates user's timezone", () => {
    userTest(
      undefined,
      actions.changePreferences({
        timezone: 'GMT +05:45'
      }),
      {
        timezone: 'GMT +05:45'
      }
    )
  })
})
