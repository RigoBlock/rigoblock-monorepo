import * as ROUTES from '../constants/routes'
import { BigNumber } from 'bignumber.js'

const emptyFunc = () => () => {}

export const defaultState = {
  preferences: {
    currentAccount: '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196',
    timezone: '+02:00'
  },
  blockChain: {
    accounts: {
      '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196': {
        provider: 'metamask',
        balance: new BigNumber('64905172851266399404'),
        vaults: {
          '0x86a1ba4d485ce346bded508e2426798f825558be': {
            id: new BigNumber('0'),
            name: 'First Vault',
            symbol: 'asd',
            owner: '0x242b2dd21e7e1a2b2516d0a3a06b58e2d9bf9196',
            group: '0x7ce6e371085cb611fb46d5065397223ef2f952ff',
            totalSupply: new BigNumber('28640000000000000000')
          },
          '0x421e1cef6e85e78da2470e54af64a626f45afb85': {
            id: new BigNumber('1'),
            name: 'Third Vault',
            symbol: 'das',
            owner: '0x7328ef1d7ab7583eb9968b2f4a9c900f8a2e2d6d',
            group: '0x7ce6e371085cb611fb46d5065397223ef2f952ff',
            totalSupply: new BigNumber('21343170000000000000')
          }
        },
        vaultTransactions: {
          '0x86a1ba4d485ce346bded508e2426798f825558be': {
            '0x2c3cdebdba5271d54780f3368f90982582b734610175e620c8b964382de9f351': {
              date: 1531227188000,
              type: 'Deposit',
              symbol: 'ETH',
              value: new BigNumber('23860000000000000000'),
              units: new BigNumber('23860000'),
              account: '0x242b2dd21e7e1a2b2516d0a3a06b58e2d9bf9196'
            },
            '0xc8c775cec1666c7bd55eb60956dc2aad39beea0846396c051410838c74c6d37c': {
              date: 1531227188000,
              type: 'Withdraw',
              symbol: 'ETH',
              value: new BigNumber('1000000000000000000'),
              units: new BigNumber('1000000'),
              account: '0x242b2dd21e7e1a2b2516d0a3a06b58e2d9bf9196'
            }
          }
        }
      },
      '0x7328ef1d7ab7583eb9968b2f4a9c900f8a2e2d6d': {
        provider: 'metamask',
        balance: new BigNumber('67999999999977505798')
      },
      '0x8bb7481495d45ccd5cffae1c3a84155fea85a323': {
        provider: 'metamask',
        balance: new BigNumber('87999999999999410580')
      }
    },
    totalBalance: new BigNumber('240888932851254804397')
  },
  routing: {
    location: {
      pathname: `${ROUTES.VAULTS}/0`
    }
  },
  form: {
    preferences: {
      values: {
        timezone: '+02:00'
      },
      initial: {
        timezone: '+02:00'
      }
    }
  }
}

export const defaultGetState = optionalState => () => ({
  ...defaultState,
  ...optionalState
})

export default ({
  mockFn = emptyFunc,
  optionalState = {},
  getState = null
} = {}) => {
  getState = getState || defaultGetState(optionalState)
  return {
    getState,
    dispatch: mockFn(),
    subscribe: mockFn()
  }
}
