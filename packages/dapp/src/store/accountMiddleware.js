export default ({ getState }) => next => action => {
  const account = getState().user.preferences.currentAccount
  action.meta = { currentAccount: account }
  return next(action)
}
