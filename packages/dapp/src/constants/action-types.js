import keyMirror from 'keymirror'

export const actionTypes = keyMirror({
  // Global actions
  GLOBAL_INIT: null,
  // Blockchain actions
  BLOCKCHAIN_INIT: null,
  BLOCKCHAIN_ERROR: null,
  LOGGED_IN: null,
  LOGGED_OUT: null,
  REGISTER_BLOCK: null,
  VAULT_FETCH_COMPLETED: null,
  // User actions
  PREFERENCE_CHANGE: null,
  // Vault actions
  REGISTER_VAULT_BLOCK: null,
  REGISTER_VAULT: null
})
