import keyMirror from 'keymirror'

export const actionTypes = keyMirror({
  // Global actions
  GLOBAL_INIT: null,
  // Blockchain actions
  BLOCKCHAIN_INIT: null,
  BLOCKCHAIN_ERROR: null,
  LOGGED_IN: null,
  LOGGED_OUT: null
})
