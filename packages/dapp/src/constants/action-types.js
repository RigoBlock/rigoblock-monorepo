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
  // User actions
  PREFERENCE_CHANGE: null,
  // Vault actions
  ADD_VAULT: null
})
