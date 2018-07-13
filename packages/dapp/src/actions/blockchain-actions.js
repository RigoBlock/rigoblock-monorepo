import { createAction } from 'redux-act'

export default {
  blockChainInit: createAction('blockChain initiated!'),
  blockChainError: createAction('blockChain error!', err => err.toString()),
  blockChainLogIn: createAction('user login', (provider, account) => ({
    provider,
    account
  })),
  blockChainLogout: createAction('user logout'),
  registerBlock: createAction(
    'event block registered',
    (account, label, block) => ({
      account,
      label,
      block
    })
  ),
  vaultFetchCompleted: createAction('vault fetch completed'),
  updateAccountBalance: createAction(
    'updating accounts balance',
    (account, balance) => ({
      account,
      balance
    })
  ),
  updateTotalAccountBalance: createAction('updating total accounts balance')
}
