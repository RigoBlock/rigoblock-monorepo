import { BigNumber } from 'bignumber.js'
import { checkBigNumber } from '../constants/utils'
import { createTransform } from 'redux-persist'
import isObject from 'lodash/isObject'
import mapValues from 'lodash/mapValues'

const bigNumberPrefix = 'bN-'

const fromBigNumber = val =>
  checkBigNumber(val) ? bigNumberPrefix + val.toString() : val

const toBigNumber = val =>
  typeof val === 'string' && val.startsWith(bigNumberPrefix)
    ? new BigNumber(val.split(bigNumberPrefix).pop())
    : val

const mapValuesDeep = (v, callback) => {
  // TODO: use a better way to identify bigNumbers when TypeChain updates BigNumber
  if (isObject(v) && !checkBigNumber(v)) {
    return mapValues(v, v => mapValuesDeep(v, callback))
  }
  return callback(v)
}

export const bigNumberTransform = createTransform(
  inboundState => mapValuesDeep(inboundState, fromBigNumber),
  outboundState => mapValuesDeep(outboundState, toBigNumber)
)
