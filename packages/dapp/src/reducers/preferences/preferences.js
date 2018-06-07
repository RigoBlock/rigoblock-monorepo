import { createReducer } from 'redux-act'
import CONSTANTS from '../../constants/user'
import blockChainActions from '../../actions/blockchain-actions'
import moment from 'moment-timezone'
import u from 'updeep'
import userActions from '../../actions/user-actions'

const initialState = {
  timezone: `GMT ${moment.tz(moment.tz.guess()).format('Z')}`,
  type: CONSTANTS.INVESTOR,
  currentAccount: null,
  provider: null
}
const preferencesReducer = createReducer(
  {
    [blockChainActions.blockChainLogIn]: (state, payload) =>
      u(
        {
          currentAccount: payload.account,
          provider: payload.provider
        },
        state
      ),
    [blockChainActions.blockChainLogout]: state =>
      u(
        {
          currentAccount: null,
          provider: null
        },
        state
      ),
    [userActions.changePreferences]: (state, payload) =>
      u(
        {
          timezone: payload.timezone
        },
        state
      )
  },
  initialState
)

export default preferencesReducer
