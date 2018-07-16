import { createAction } from 'redux-act'

export default {
  init: createAction('DApp initialised'),
  openModal: createAction('Open modal'),
  closeModal: createAction('Close modal')
}
