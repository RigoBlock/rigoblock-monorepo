import { createAction } from 'redux-act'

export default {
  registerVaultBlock: createAction('vault block saved to state', block => ({
    block
  })),
  registerVault: createAction('vault saved to state', vault => ({ vault })),
  saveVaultSupply: createAction('fetched vault total supply', supplyData => ({
    supplyData
  }))
}
