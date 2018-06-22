import { BigNumber } from 'bignumber.js'

export const toBigNumber = val => new BigNumber(val)
export const fromWei = val => val / 1e18
export const fromMicro = val => val / 1e6
