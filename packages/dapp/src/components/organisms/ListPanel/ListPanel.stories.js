import React from 'react'
import { storiesOf } from '@storybook/react'
import ListPanel from './ListPanel'
import '../../_settings/_base.scss'

const items = [
  {
    id: 1,
    name: 'Rocksolid Vault',
    symbol: 'VLT',
    value: 12489.51323
  },
  {
    id: 2,
    name: 'Big Drago',
    symbol: 'DRG',
    growth: 0.25,
    currencyGrowth: 2.32
  },
  {
    id: 3,
    name: 'Rocksolid Vault',
    symbol: 'VLT',
    value: 12489.51323
  }
]

storiesOf('Organisms/ListPanel', module)
  .addDecorator(story => <div style={{ width: '400px' }}>{story()}</div>)
  .add('default', () => <ListPanel title={'Example ListPanel'} items={items} />)
