import { Ethfinex } from './ethfinex'
import { ZeroExStandardRelayerRaw } from './zeroExStandardRelayerRaw'
import { supportedExchanges } from '../constants'

export default {
  [supportedExchanges.ETHFINEX]: Ethfinex,
  [supportedExchanges.ZEROEXRELAYER]: ZeroExStandardRelayerRaw
}
