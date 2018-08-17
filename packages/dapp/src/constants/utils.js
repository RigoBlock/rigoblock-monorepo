import isObject from 'lodash/isObject'

export const ETH_TO_MICRO = 1e6
export const ETH_TO_WEI = 1e18
export const MICRO_TO_WEI = 1e12

export const INPUT_SANITIZE_REGEXP = /[^a-z\d\s]/gi

export const parseFormValues = valuesObj =>
  Object.entries(valuesObj)
    .map(([key, value]) => ({
      [key]: value.replace(INPUT_SANITIZE_REGEXP, '')
    }))
    .reduce((acc, curr) => ({ ...acc, ...curr }), {})

// we are filtering for BigNumbers
// TODO: remove once isBigNumber() starts working
export const isBigNumber = val =>
  isObject(val) && Object.keys(val).includes('c') && Array.isArray(val.c)
