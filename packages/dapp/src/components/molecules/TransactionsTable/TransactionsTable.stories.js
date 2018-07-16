import '../../_settings/_base.scss'
import { BigNumber } from 'bignumber.js'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs/react'
import React from 'react'
import TransactionsTable from './TransactionsTable'
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
  const id = Web3.prototype.toHex(Math.random())
  return {
    ...transactionData,
    id: id
  }
}

const tableData = [
  { ...createTransaction() },
  { ...createTransaction() },
  { ...createTransaction() },
  { ...createTransaction() },
  { ...createTransaction() }
]

const tableColumns = [
  {
    Header: 'ID',
    id: 'id',
    accessor: d => d.id.substr(d.id.length - 5, 5).toUpperCase()
  },
  {
    Header: 'Type',
    accessor: 'type'
  },
  {
    Header: 'Symbol',
    accessor: 'symbol'
  },
  {
    Header: 'Units',
    id: 'units',
    accessor: d => d.units.toString()
  }
]

storiesOf('Organisms/TransactionsTable', module)
  .addDecorator(withKnobs)
  .addDecorator(story => <div style={{ width: '446px' }}>{story()}</div>)
  .add('default', () => (
    <TransactionsTable tableColumns={tableColumns} tableData={tableData} />
  ))
