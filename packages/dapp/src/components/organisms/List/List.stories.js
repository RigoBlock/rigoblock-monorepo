import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, object } from '@storybook/addon-knobs/react'
import List from './List'
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

storiesOf('Organisms/List', module)
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <div style={{ width: '400px', border: '1px solid rgba(0, 0, 0, 0.1)' }}>
      {story()}
    </div>
  ))
  .add('default', () => <List items={object('Items', items)} />)
