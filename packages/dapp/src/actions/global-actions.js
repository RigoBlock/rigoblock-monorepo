import { actionTypes } from '../constants/action-types'

export default {
  init: () => ({
    type: actionTypes.GLOBAL_INIT
  }),
  providerEngineInit: () => ({
    type: actionTypes.PROVIDER_ENGINE_INIT
  })
}
