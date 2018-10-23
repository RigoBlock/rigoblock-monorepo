import '../../_settings/_base.scss'
import { BigNumber } from 'bignumber.js'
import { INVESTOR, MANAGER } from '../../../constants/user'
import { MemoryRouter } from 'react-router-dom'
import { select, withKnobs } from '@storybook/addon-knobs/react'
import { storiesOf } from '@storybook/react'
import React from 'react'
import VaultFees from './VaultFees'

const userTypes = {
  Manager: MANAGER,
  Investor: INVESTOR
}

const vault = {
  id: new BigNumber('0'),
  name: 'First Vault',
  symbol: 'asd',
  owner: '0x242b2dd21e7e1a2b2516d0a3a06b58e2d9bf9196',
  group: '0x7ce6e371085cb611fb46d5065397223ef2f952ff',
  totalSupply: new BigNumber('28640000000000000000'),
  transactionFee: new BigNumber('2.50')
}

storiesOf('Organisms/VaultFees', module)
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <div style={{ width: '478px', background: 'white' }}>{story()}</div>
  ))
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add('default', () => (
    <VaultFees
      vault={vault}
      userType={select('User type', userTypes, userTypes.Investor)}
    />
  ))
