import { BigNumber } from 'bignumber.js'
import { createTransform } from 'redux-persist'
import _ from 'lodash'

const fromBigNumber = val =>
  val && Object.keys(val).includes('c') && _.isArray(val.c)
    ? `bN-${val.toString()}`
    : val

const toBigNumber = val =>
  typeof val === 'string' && val.startsWith('bN-')
    ? new BigNumber(val.split('bN-').pop())
    : val

const mapValuesDeep = (v, callback) => {
  // TODO: use a better way to identify bigNumbers when TypeChain updates BigNumber
  if (_.isObject(v) && !(Object.keys(v).includes('c') && _.isArray(v.c))) {
    return _.mapValues(v, v => mapValuesDeep(v, callback))
  } else {
    return callback(v)
  }
}

export const bigNumberTransform = createTransform(
  inboundState => mapValuesDeep(inboundState, fromBigNumber),
  outboundState => mapValuesDeep(outboundState, toBigNumber)
)
