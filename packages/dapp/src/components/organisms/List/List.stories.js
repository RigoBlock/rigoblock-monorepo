import '../../_settings/_base.scss'
import { BigNumber } from 'bignumber.js'
import { object, withKnobs } from '@storybook/addon-knobs/react'
import { storiesOf } from '@storybook/react'
import List from './List'
import ListItem from '../../molecules/ListItem'
import React from 'react'

const items = [
  {
    itemName: 'Rocksolid Vault',
    itemSymbol: 'VLT',
    itemValue: new BigNumber('12489.51323')
  },
  {
    itemName: 'Big Drago',
    itemSymbol: 'DRG',
    growth: new BigNumber('0.25'),
    currencyGrowth: new BigNumber('2.32')
  },
  {
    itemName: 'Rocksolid Vault',
    itemSymbol: 'VLT',
    itemValue: new BigNumber('12489.51323')
  }
]

storiesOf('Organisms/List', module)
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <div style={{ width: '400px', border: '1px solid rgba(0, 0, 0, 0.1)' }}>
      {story()}
    </div>
  ))
  .add('default', () => (
    <List Component={ListItem} data={object('Items', items)} />
  ))
