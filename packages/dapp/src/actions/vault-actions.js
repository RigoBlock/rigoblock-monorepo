import { createAction } from 'redux-act'

export default {
  registerVaultBlock: createAction(
    'vault block saved to state',
    ({ block }, account) => ({
      block,
      account
    })
  ),
  registerVault: createAction('vault saved to state', (vault, account) => ({
    vault,
    account
  }))
}
