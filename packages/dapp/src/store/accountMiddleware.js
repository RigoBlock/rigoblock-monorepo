export default ({ getState }) => next => action => {
  const account = getState().user.preferences.currentAccount
  action.account = account
  return next(action)
}
