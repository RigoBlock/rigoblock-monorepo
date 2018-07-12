import '../../_settings/_base.scss'
import { BigNumber } from 'bignumber.js'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs/react'
import React from 'react'
import VaultTransactionsTable from './VaultTransactionsTable'
import Web3 from 'web3'
import mockStore, { defaultState } from '../../../fixtures/store'

const transactionData = {
  date: 1531227188000,
  type: 'Deposit',
  symbol: 'ETH',
  value: new BigNumber('10000000000000000000'),
  units: new BigNumber('10000000'),
  account: '0x242b2dd21e7e1a2b2516d0a3a06b58e2d9bf9196'
}

const createTransaction = () => {
  const id = Web3.prototype.toHex(Math.random())
  return {
    [id]: transactionData
  }
}

const getState = () => ({
  ...defaultState,
  ...{
    blockChain: {
      accounts: {
        '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196': {
          vaultTransactions: {
            '0x86a1ba4d485ce346bded508e2426798f825558be': {
              ...createTransaction(),
              ...createTransaction(),
              ...createTransaction(),
              ...createTransaction(),
              ...createTransaction(),
              ...createTransaction(),
              ...createTransaction(),
              ...createTransaction(),
              ...createTransaction(),
              ...createTransaction(),
              ...createTransaction(),
              ...createTransaction(),
              ...createTransaction(),
              ...createTransaction(),
              ...createTransaction(),
              ...createTransaction(),
              ...createTransaction(),
              ...createTransaction(),
              ...createTransaction(),
              ...createTransaction(),
              ...createTransaction(),
              ...createTransaction(),
              ...createTransaction(),
              ...createTransaction(),
              ...createTransaction(),
              ...createTransaction(),
              ...createTransaction(),
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
  .add('default', () => (
    <VaultTransactionsTable
      vaultAddress={VAULT_ADDRESS}
      columnWidths={[70, 60, 40]}
    />
  ))
