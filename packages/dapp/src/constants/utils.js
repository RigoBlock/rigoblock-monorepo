import isArray from 'lodash/isArray'
import isObject from 'lodash/isObject'

export const ETHTOMICRO = 1e6
export const ETHTOWEI = 1e18

// we are filtering for BigNumbers
// TODO: remove once isBigNumber() starts working
export const checkBigNumber = val =>
  isObject(val) && Object.keys(val).includes('c') && isArray(val.c)
