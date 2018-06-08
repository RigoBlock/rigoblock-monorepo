export default ({ getState }) => next => action => {
  if (action.type.match(/^persist/g) || action.type.match(/^@@redux-form/g)) {
    return next(action)
  }
  const account = getState().user.preferences.currentAccount
  action.payload = account
    ? { ...action.payload, currentAccount: account }
    : action.payload
  return next(action)
}
