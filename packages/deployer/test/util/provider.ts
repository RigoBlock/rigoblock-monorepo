import * as Web3 from 'web3'
import { Provider } from '@0xproject/types'
import { web3Factory } from '@0xproject/dev-utils'

const providerConfigs = { shouldUseInProcessGanache: true }
const web3Instance = web3Factory.create(providerConfigs)
const provider: Provider = web3Instance.currentProvider

export { provider }
