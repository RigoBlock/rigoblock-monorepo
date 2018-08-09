import { Ethfinex } from './ethfinex'
import { SupportedExchanges } from '../constants'

const exchangesMap = {
  [SupportedExchanges.ETHFINEX]: Ethfinex
}

export default exchangesMap
