import 'promise/polyfill'
import 'whatwg-fetch'
import exchangeConnector from './exchangeConnector'

export { supportedExchanges, NETWORKS } from './constants'

export default exchangeConnector
