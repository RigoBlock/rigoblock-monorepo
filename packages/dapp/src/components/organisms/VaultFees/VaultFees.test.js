import { BigNumber } from 'bignumber.js'
import { shallow } from 'enzyme'
import React from 'react'
import VaultFees from './VaultFees.jsx'
import toJson from 'enzyme-to-json'

const vault = {
  id: new BigNumber('0'),
  name: 'First Vault',
  symbol: 'asd',
  owner: '0x242b2dd21e7e1a2b2516d0a3a06b58e2d9bf9196',
  group: '0x7ce6e371085cb611fb46d5065397223ef2f952ff',
  totalSupply: new BigNumber('28640000000000000000'),
  transactionFee: new BigNumber('2.50')
}

describe('VaultFees component', () => {
  it('renders correctly', () => {
    expect(toJson(shallow(<VaultFees vault={vault} />))).toMatchSnapshot()
  })
})
