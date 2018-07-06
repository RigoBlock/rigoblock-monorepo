import { createAction } from 'redux-act'

export default {
  registerVaultBlock: createAction('vault block saved to state'),
  registerVault: createAction('vault saved to state'),
  updateVaultData: createAction("fetched vault's total supply"),
  registerTransaction: createAction('registered vault transaction')
}
