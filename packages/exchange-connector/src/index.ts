import 'promise/polyfill'
import 'whatwg-fetch'
import exchangeFactory from './exchangeFactory'

export { default as exchangeMap } from './exchanges'
export { supportedExchanges, NETWORKS } from './constants'

export default exchangeFactory
