import keyMirror from 'keymirror'

export const actionTypes = keyMirror({
  // Counter actions
  COUNTER_ADD: null,
  COUNTER_SUBTRACT: null,

  // Global actions
  GLOBAL_INIT: null,
  BLOCKCHAIN_INIT: null,
  BLOCKCHAIN_ERROR: null,
  LOGGED_IN: null,
  LOGGED_OUT: null
})
