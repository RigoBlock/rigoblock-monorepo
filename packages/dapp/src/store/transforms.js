import { BigNumber } from 'bignumber.js'
import { createTransform } from 'redux-persist'
import isArray from 'lodash/isArray'
import isObject from 'lodash/isObject'
import mapValues from 'lodash/mapValues'

const fromBigNumber = val =>
  isObject(val) && Object.keys(val).includes('c') && isArray(val.c)
    ? `bN-${val.toString()}`
    : val

const toBigNumber = val =>
  typeof val === 'string' && val.startsWith('bN-')
    ? new BigNumber(val.split('bN-').pop())
    : val

const mapValuesDeep = (v, callback) => {
  // TODO: use a better way to identify bigNumbers when TypeChain updates BigNumber
  if (isObject(v) && !Object.keys(v).includes('c') /*&& isArray(v.c) */) {
    return mapValues(v, v => mapValuesDeep(v, callback))
  } else {
    return callback(v)
  }
}

export const bigNumberTransform = createTransform(
  inboundState => mapValuesDeep(inboundState, fromBigNumber),
  outboundState => mapValuesDeep(outboundState, toBigNumber)
)
