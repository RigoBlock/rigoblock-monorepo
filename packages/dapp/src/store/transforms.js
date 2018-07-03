import { BigNumber } from 'bignumber.js'
import { createTransform } from 'redux-persist'
import { isBigNumber } from '../constants/utils'
import isObject from 'lodash/isObject'
import mapValues from 'lodash/mapValues'

const BIGNUMBER_PREFIX = 'bN-'

const fromBigNumber = val =>
  isBigNumber(val) ? BIGNUMBER_PREFIX + val.toString() : val

const toBigNumber = val =>
  typeof val === 'string' && val.startsWith(BIGNUMBER_PREFIX)
    ? new BigNumber(val.split(BIGNUMBER_PREFIX).pop())
    : val

const mapValuesDeep = (v, callback) => {
  // TODO: use a better way to identify bigNumbers when TypeChain updates BigNumber
  if (isObject(v) && !isBigNumber(v)) {
    return mapValues(v, v => mapValuesDeep(v, callback))
  }
  return callback(v)
}

export const bigNumberTransform = createTransform(
  inboundState => mapValuesDeep(inboundState, fromBigNumber),
  outboundState => mapValuesDeep(outboundState, toBigNumber)
)
