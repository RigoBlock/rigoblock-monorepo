import { Ethfinex } from './ethfinex'
import { SupportedExchanges } from '../constants'

const ExchangesMap = {
  [SupportedExchanges.ETHFINEX]: Ethfinex
}

export default ExchangesMap
