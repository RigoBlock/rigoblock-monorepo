import { BigNumber } from 'bignumber.js'
import { shallow } from 'enzyme'
import React from 'react'
import Table from './Table.jsx'
import toJson from 'enzyme-to-json'

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

const transaction = {
  id: '0x0d25486b4cfc7beb674b8',
  date: 1531227188000,
  type: 'Deposit',
  symbol: 'ETH',
  value: new BigNumber('23860000000000000000'),
  units: new BigNumber('23860000'),
  account: '0x242b2dd21e7e1a2b2516d0a3a06b58e2d9bf9196'
}

const wrapper = shallow(
  <Table
    tableData={[transaction]}
    tableColumns={tableColumns}
    title="Transactions"
  />
)

describe('Table component', () => {
  it('renders correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
