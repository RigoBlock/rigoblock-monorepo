import blockChainEpic from './blockChain'
import getAccountBalanceEpic from './getAccountBalance'
import getTotalAccountsBalanceEpic from './getTotalAccountsBalance'

export default [
  blockChainEpic,
  getAccountBalanceEpic,
  getTotalAccountsBalanceEpic
]
