import { Ethfinex } from './ethfinex'
import { EthfinexRaw } from './ethfinexRaw'
import { ZeroExStandardRelayerRaw } from './zeroExStandardRelayerRaw'
import { supportedExchanges } from '../constants'

export default {
  [supportedExchanges.ETHFINEX]: Ethfinex,
  [supportedExchanges.ETHFINEX_RAW]: EthfinexRaw,
  [supportedExchanges.ZEROEXRELAYER]: ZeroExStandardRelayerRaw
}
