import '../../_settings/_base.scss'
import { BigNumber } from 'bignumber.js'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs/react'
import React from 'react'
import VaultTransactionsTable from './VaultTransactionsTable'
import mockStore, { defaultState } from '../../../fixtures/store'

const getState = () => ({
  ...defaultState,
  ...{
    blockChain: {
      accounts: {
        '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196': {
          vaultTransactions: {
            '0x86a1ba4d485ce346bded508e2426798f825558be': {
              '0x2c3cdebdba5271d54780f3368f90982582b734610175e620c8b964382de9f351': {
                date: 1531227188000,
                type: 'Deposit',
                symbol: 'ETH',
                value: new BigNumber('10000000000000000000'),
                units: new BigNumber('10000000'),
                account: '0x242b2dd21e7e1a2b2516d0a3a06b58e2d9bf9196'
              },
              '0x2c3cdebdba5271d54780f3368f90982582b734610175e620c8b964382de9f352': {
                date: 1531227188000,
                type: 'Deposit',
                symbol: 'ETH',
                value: new BigNumber('10000000000000000000'),
                units: new BigNumber('10000000'),
                account: '0x242b2dd21e7e1a2b2516d0a3a06b58e2d9bf9196'
              },
              '0x2c3cdebdba5271d54780f3368f90982582b734610175e620c8b964382de9f353': {
                date: 1531227188000,
                type: 'Deposit',
                symbol: 'ETH',
                value: new BigNumber('10000000000000000000'),
                units: new BigNumber('10000000'),
                account: '0x242b2dd21e7e1a2b2516d0a3a06b58e2d9bf9196'
              },
              '0x2c3cdebdba5271d54780f3368f90982582b734610175e620c8b964382de9f354': {
                date: 1531227188000,
                type: 'Deposit',
                symbol: 'ETH',
                value: new BigNumber('10000000000000000000'),
                units: new BigNumber('10000000'),
                account: '0x242b2dd21e7e1a2b2516d0a3a06b58e2d9bf9196'
              },
              '0x2c3cdebdba5271d54780f3368f90982582b734610175e620c8b964382de9f351': {
                date: 1531227188000,
                type: 'Deposit',
                symbol: 'ETH',
                value: new BigNumber('10000000000000000000'),
                units: new BigNumber('10000000'),
                account: '0x242b2dd21e7e1a2b2516d0a3a06b58e2d9bf9196'
              },
              '0x2c3cdebdba5271d54780f3368f90982582b734asd75e620c8b964382de9f355': {
                date: 1531227188000,
                type: 'Deposit',
                symbol: 'ETH',
                value: new BigNumber('10000000000000000000'),
                units: new BigNumber('10000000'),
                account: '0x242b2dd21e7e1a2b2516d0a3a06b58e2d9bf9196'
              },
              '0x2c3cdebdba5271d54780f3368f90982582b73461017asd123c8b964382de9f351': {
                date: 1531227188000,
                type: 'Deposit',
                symbol: 'ETH',
                value: new BigNumber('10000000000000000000'),
                units: new BigNumber('10000000'),
                account: '0x242b2dd21e7e1a2b2516d0a3a06b58e2d9bf9196'
              },
              '0x2c3cdebdba5271d54780f3368f90982582dfsds10175e620c8b964382de9f351': {
                date: 1531227188000,
                type: 'Deposit',
                symbol: 'ETH',
                value: new BigNumber('10000000000000000000'),
                units: new BigNumber('10000000'),
                account: '0x242b2dd21e7e1a2b2516d0a3a06b58e2d9bf9196'
              },
              '0x2c3cdebdba5271d54780f3368f90982582asdf0175e620c8b964382de9f351': {
                date: 1531227188000,
                type: 'Deposit',
                symbol: 'ETH',
                value: new BigNumber('10000000000000000000'),
                units: new BigNumber('10000000'),
                account: '0x242b2dd21e7e1a2b2516d0a3a06b58e2d9bf9196'
              },
              '0x2c3cdebdba5271d54780f3368f9098ager2610175e620c8b964382de9f351': {
                date: 1531227188000,
                type: 'Deposit',
                symbol: 'ETH',
                value: new BigNumber('10000000000000000000'),
                units: new BigNumber('10000000'),
                account: '0x242b2dd21e7e1a2b2516d0a3a06b58e2d9bf9196'
              },
              '0x2c3cdebdba5271d54780f3368f9098fdgs610175e620c8b964382de9f351': {
                date: 1531227188000,
                type: 'Deposit',
                symbol: 'ETH',
                value: new BigNumber('10000000000000000000'),
                units: new BigNumber('10000000'),
                account: '0x242b2dd21e7e1a2b2516d0a3a06b58e2d9bf9196'
              },
              '0x2c3cdebdba5271d54780f3368dfsg10175e620c8b964382de9f351': {
                date: 1531227188000,
                type: 'Deposit',
                symbol: 'ETH',
                value: new BigNumber('10000000000000000000'),
                units: new BigNumber('10000000'),
                account: '0x242b2dd21e7e1a2b2516d0a3a06b58e2d9bf9196'
              },
              '0x2c3cdebdba5271d54780f3368f909123610175e620c8b964382de9f351': {
                date: 1531227188000,
                type: 'Deposit',
                symbol: 'ETH',
                value: new BigNumber('10000000000000000000'),
                units: new BigNumber('10000000'),
                account: '0x242b2dd21e7e1a2b2516d0a3a06b58e2d9bf9196'
              },
              '0x2c3cdebdba5271d54780f3368f909825sdfg0175e620c8b964382de9f351': {
                date: 1531227188000,
                type: 'Deposit',
                symbol: 'ETH',
                value: new BigNumber('10000000000000000000'),
                units: new BigNumber('10000000'),
                account: '0x242b2dd21e7e1a2b2516d0a3a06b58e2d9bf9196'
              },
              '0x2c3cdebdba5271d54780f3368f90982582bsdfg2175e620c8b964382de9f351': {
                date: 1531227188000,
                type: 'Deposit',
                symbol: 'ETH',
                value: new BigNumber('10000000000000000000'),
                units: new BigNumber('10000000'),
                account: '0x242b2dd21e7e1a2b2516d0a3a06b58e2d9bf9196'
              },
              '0x2c3cdebdba5271d54780f3368f9098212efds610175e620c8b964382de9f351': {
                date: 1531227188000,
                type: 'Deposit',
                symbol: 'ETH',
                value: new BigNumber('10000000000000000000'),
                units: new BigNumber('10000000'),
                account: '0x242b2dd21e7e1a2b2516d0a3a06b58e2d9bf9196'
              },
              '0x2c3cdebdba5271d54780f3368f90982sadfasd0175e620c8b964382de9f351': {
                date: 1531227188000,
                type: 'Deposit',
                symbol: 'ETH',
                value: new BigNumber('10000000000000000000'),
                units: new BigNumber('10000000'),
                account: '0x242b2dd21e7e1a2b2516d0a3a06b58e2d9bf9196'
              },
              '0x2c3cdebdba5271d54780f3368f90982582b734610175e620c8b964382de9f351': {
                date: 1531227188000,
                type: 'Deposit',
                symbol: 'ETH',
                value: new BigNumber('10000000000000000000'),
                units: new BigNumber('10000000'),
                account: '0x242b2dd21e7e1a2b2516d0a3a06b58e2d9bf9196'
              },
              '0x2c3cdebdba5271d54780f3368f90982sadgf234610175e620c8b964382de9f351': {
                date: 1531227188000,
                type: 'Deposit',
                symbol: 'ETH',
                value: new BigNumber('10000000000000000000'),
                units: new BigNumber('10000000'),
                account: '0x242b2dd21e7e1a2b2516d0a3a06b58e2d9bf9196'
              },
              '0x2c3cdebdba5271d54780f3368f90982582b712432134e620c8b964382de9f351': {
                date: 1531227188000,
                type: 'Deposit',
                symbol: 'ETH',
                value: new BigNumber('10000000000000000000'),
                units: new BigNumber('10000000'),
                account: '0x242b2dd21e7e1a2b2516d0a3a06b58e2d9bf9196'
              },
              '0x2c3cdebdba5271d54780f3368f9098258132frx5e620c8b964382de9f351': {
                date: 1531227188000,
                type: 'Deposit',
                symbol: 'ETH',
                value: new BigNumber('10000000000000000000'),
                units: new BigNumber('10000000'),
                account: '0x242b2dd21e7e1a2b2516d0a3a06b58e2d9bf9196'
              },
              '0x2c3cdebdba5271d54780f3368f90982581235475e620c8b964382de9f351': {
                date: 1531227188000,
                type: 'Deposit',
                symbol: 'ETH',
                value: new BigNumber('10000000000000000000'),
                units: new BigNumber('10000000'),
                account: '0x242b2dd21e7e1a2b2516d0a3a06b58e2d9bf9196'
              },
              '0x2c3cdebdba5271d54780f3368f909a2321a10175e620c8b964382de9f351': {
                date: 1531227188000,
                type: 'Deposit',
                symbol: 'ETH',
                value: new BigNumber('10000000000000000000'),
                units: new BigNumber('10000000'),
                account: '0x242b2dd21e7e1a2b2516d0a3a06b58e2d9bf9196'
              },
              '0x2c3cdebdba5271d54780f3368f9123eds4610175e620c8b964382de9f351': {
                date: 1531227188000,
                type: 'Deposit',
                symbol: 'ETH',
                value: new BigNumber('10000000000000000000'),
                units: new BigNumber('10000000'),
                account: '0x242b2dd21e7e1a2b2516d0a3a06b58e2d9bf9196'
              },
              '0x2c3cdebdba5271d54780f3368f909825142rfxza34610175e620c8b964382de9f351': {
                date: 1531227188000,
                type: 'Deposit',
                symbol: 'ETH',
                value: new BigNumber('10000000000000000000'),
                units: new BigNumber('10000000'),
                account: '0x242b2dd21e7e1a2b2516d0a3a06b58e2d9bf9196'
              },
              '0x2c3cdebdba5271d54780f3368fzsdcw4610175e620c8b964382de9f351': {
                date: 1531227188000,
                type: 'Deposit',
                symbol: 'ETH',
                value: new BigNumber('10000000000000000000'),
                units: new BigNumber('10000000'),
                account: '0x242b2dd21e7e1a2b2516d0a3a06b58e2d9bf9196'
              },
              '0x2c3cdebdba5271d54780f3368f90ffxd175e620c8b964382de9f351': {
                date: 1531227188000,
                type: 'Deposit',
                symbol: 'ETH',
                value: new BigNumber('10000000000000000000'),
                units: new BigNumber('10000000'),
                account: '0x242b2dd21e7e1a2b2516d0a3a06b58e2d9bf9196'
              },
              '0xc8c775cec1666c7bd55eb60956dc2aadzxfw846396c051410838c74c6d37c': {
                date: 1531227188000,
                type: 'Withdraw',
                symbol: 'ETH',
                value: new BigNumber('1000000000000000000'),
                units: new BigNumber('1000000'),
                account: '0x242b2dd21e7e1a2b2516d0a3a06b58e2d9bf9196'
              }
            }
          }
        }
      }
    }
  }
})

const store = mockStore({ getState })

const VAULT_ADDRESS = '0x86a1ba4d485ce346bded508e2426798f825558be'

storiesOf('Organisms/VaultTransactionsTable', module)
  .addDecorator(withKnobs)
  .addDecorator(story => <div style={{ width: '446px' }}>{story()}</div>)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('default', () => <VaultTransactionsTable vaultAddress={VAULT_ADDRESS} />)
