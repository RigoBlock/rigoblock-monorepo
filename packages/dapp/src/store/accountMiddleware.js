export default ({ getState }) => next => action => {
  if (action.type.match(/^persist/gm)) {
    return next(action)
  }
  const account = getState().user.preferences.currentAccount
  action.payload = account
    ? { ...action.payload, currentAccount: account }
    : action.payload
  return next(action)
}
