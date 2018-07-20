import { BigNumber } from 'bignumber.js'
import { MemoryRouter } from 'react-router-dom'
import { mount } from 'enzyme'
import React from 'react'
import VaultTransactions from './VaultTransactions.jsx'
import toJson from 'enzyme-to-json'

const transactions = {
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

const wrapper = mount(
  <MemoryRouter initialEntries={[{ key: 'testKey' }]}>
    <VaultTransactions transactions={transactions} />
  </MemoryRouter>
)

describe('VaultTransactions component', () => {
  it('renders correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
