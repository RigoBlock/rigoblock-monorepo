import 'promise/polyfill'
import 'whatwg-fetch'
import exchangeConnector from './exchangeConnector'

export { default as exchanges } from './exchanges'
export { supportedExchanges, NETWORKS } from './constants'

export default exchangeConnector
