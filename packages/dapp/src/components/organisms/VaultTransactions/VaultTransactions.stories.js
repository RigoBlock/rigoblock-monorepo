import '../../_settings/_base.scss'
import { BigNumber } from 'bignumber.js'
import { MemoryRouter } from 'react-router-dom'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs/react'
import React from 'react'
import VaultTransactions from './VaultTransactions'
import Web3 from 'web3'

const transactionData = {
  date: 1531227188000,
  type: 'Deposit',
  symbol: 'ETH',
  value: new BigNumber('23860000000000000000'),
  units: new BigNumber('23860000'),
  account: '0x242b2dd21e7e1a2b2516d0a3a06b58e2d9bf9196'
}

const createTransaction = () => {
  const id = Web3.utils.randomHex()
  return {
    [id]: transactionData
  }
}

let transactions = Array.from(Array(28), createTransaction).reduce(
  (acc, prev) => ({ ...acc, ...prev }),
  {}
)

transactions = {
  ...transactions,
  ...{
    '0xc8c775cec1666c7bd55eb60956dc2aadzxfw846396c051410838c74c6d37c': {
      date: 1531227188000,
      type: 'Withdraw',
      symbol: 'ETH',
      value: new BigNumber('1000000000000000000'),
      units: new BigNumber('1000000'),
      account: '0x242b2dd21e7e1a2b2516d0a3a06b58e2d9bf9196'
    }
  },
  ...{
    '0xc8c775cec1666asdasda0956dc2aadzxfw846396c051410838c74c6d37c': {
      date: 1531227188000,
      type: 'Withdraw',
      symbol: 'ETH',
      value: new BigNumber('900000000000000000000'),
      units: new BigNumber('999999999'),
      account: '0x242b2dd21e7e1a2b2516d0a3a06b58e2d9bf9196'
    }
  }
}
storiesOf('Organisms/VaultTransactions', module)
  .addDecorator(withKnobs)
  .addDecorator(story => <div style={{ width: '446px' }}>{story()}</div>)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add('default', () => <VaultTransactions transactions={transactions} />)
