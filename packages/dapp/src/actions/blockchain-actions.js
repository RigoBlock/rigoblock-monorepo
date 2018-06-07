import { createAction } from 'redux-act'

export default {
  blockChainInit: createAction('blockChain initiated!'),
  blockChainError: createAction('something went wrong', err => err.toString()),
  blockChainLogIn: createAction('user login', (origin, account) => ({
    origin,
    account
  })),
  blockChainLogout: createAction('user logout'),
  registerBlock: createAction('event block registered', (label, block) => ({
    label,
    block
  })),
  vaultFetchCompleted: createAction('vault fetch completed')
}
