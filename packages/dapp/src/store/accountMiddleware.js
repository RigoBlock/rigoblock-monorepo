import actionVariables from '../constants/actions'

export default ({ getState }) => next => action => {
  const regexp = new RegExp(
    '^' + actionVariables.persist + '|^' + actionVariables.form
  )
  console.log(regexp)
  if (regexp.test(action.type)) {
    return next(action)
  }
  const account = getState().user.preferences.currentAccount
  action.payload = account
    ? { ...action.payload, currentAccount: account }
    : action.payload
  return next(action)
}
