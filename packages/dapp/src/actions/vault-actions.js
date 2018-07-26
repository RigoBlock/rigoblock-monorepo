import { createAction } from 'redux-act'

export default {
  registerVaultBlock: createAction('vault block saved to state'),
  registerVault: createAction('vault saved to state'),
  updateVaultData: createAction("updated vault's data"),
  registerTransaction: createAction('registered vault transaction'),
  createVault: createAction('new vault data submitted'),
  vaultCreated: createAction('vault created!')
}
