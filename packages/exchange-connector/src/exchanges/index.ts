import { Ethfinex } from './ethfinex'
import { supportedExchanges } from '../constants'

export default {
  [supportedExchanges.ETHFINEX]: Ethfinex
}
