import { INVESTOR } from '../../constants/user'
import { createReducer } from 'redux-act'
import blockChainActions from '../../actions/blockchain-actions'
import moment from 'moment-timezone'
import persistentDecorator from '../../store/persistentDecorator'
import u from 'updeep'
import userActions from '../../actions/user-actions'

const initialState = {
  timezone: `GMT ${moment.tz(moment.tz.guess()).format('Z')}`,
  type: INVESTOR,
  currentAccount: null,
  provider: null
}
const preferencesReducer = createReducer(
  {
    [blockChainActions.blockChainLogIn]: (state, { provider, account }) =>
      u(
        {
          currentAccount: account,
          provider
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
    [userActions.changePreferences]: (state, payload) => {
      return u(payload, state)
    }
  },
  initialState
)

export default persistentDecorator(preferencesReducer, 'preferences', [
  'type',
  'currentAccount',
  'provider'
])
