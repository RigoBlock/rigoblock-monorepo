import '../../_settings/_base.scss'
import { BigNumber } from 'bignumber.js'
import { storiesOf } from '@storybook/react'
import { text, withKnobs } from '@storybook/addon-knobs/react'
import React from 'react'
import Table from './Table'
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
    ...transactionData,
    id: id
  }
}

const tableData = Array.from(Array(5), createTransaction)
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

storiesOf('Organisms/Table', module)
  .addDecorator(withKnobs)
  .addDecorator(story => <div style={{ width: '446px' }}>{story()}</div>)
  .add('default', () => (
    <Table
      tableColumns={tableColumns}
      tableData={tableData}
      title={text('Title text', 'Transactions')}
    />
  ))
