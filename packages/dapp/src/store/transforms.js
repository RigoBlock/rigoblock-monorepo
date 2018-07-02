import { createTransform } from 'redux-persist'
import _ from 'lodash'

const fromBigNumber = val => {
  if (val && Object.keys(val).includes('c') && _.isArray(val.c)) {
    return `bN-${val.toString()}`
  }
  return val
}

const toBigNumber = val =>
  typeof val === 'string' && val.startsWith('bN-')
    ? new BigNumber(val.split('bN-').pop())
    : val

const mapValuesDeep = (v, callback, k, from) => {
  // TODO: use a better way to identify bigNumbers when TypeChain updates BigNumber
  if (_.isObject(v) && !(Object.keys(v).includes('c') && _.isArray(v.c))) {
    return _.mapValues(v, (v, k) => mapValuesDeep(v, callback, k, from))
  } else {
    return callback(v)
  }
}

export const bigNumberTransform = createTransform(
  inboundState => {
    const newState = mapValuesDeep(
      inboundState,
      fromBigNumber,
      undefined,
      'inbound'
    )
    return newState
  },
  outboundState =>
    mapValuesDeep(outboundState, toBigNumber, undefined, 'outbound')
)
