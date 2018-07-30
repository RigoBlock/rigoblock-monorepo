import blockChainEpic from './blockChain'
import closeModalEpic from './closeModal'
import getAccountBalanceEpic from './getAccountBalance'
import getTotalAccountsBalanceEpic from './getTotalAccountsBalance'

export default [
  blockChainEpic,
  getAccountBalanceEpic,
  getTotalAccountsBalanceEpic,
  closeModalEpic
]
