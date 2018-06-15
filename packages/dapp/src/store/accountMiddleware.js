import { FORM, PERSIST } from '../constants/actions'

export default ({ getState }) => next => action => {
  const regexp = new RegExp('^' + PERSIST + '|^' + FORM)
  if (regexp.test(action.type)) {
    return next(action)
  }
  const account = getState().user.preferences.currentAccount
  action.meta = { currentAccount: account }
  return next(action)
}
