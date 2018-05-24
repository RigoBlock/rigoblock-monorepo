import '../../_settings/_base.scss'
import { object, withKnobs } from '@storybook/addon-knobs/react'
import { storiesOf } from '@storybook/react'
import List from './List'
import React from 'react'

const items = [
  {
    itemName: 'Rocksolid Vault',
    itemSymbol: 'VLT',
    itemValue: 12489.51323
  },
  {
    itemName: 'Big Drago',
    itemSymbol: 'DRG',
    growth: 0.25,
    currencyGrowth: 2.32
  },
  {
    itemName: 'Rocksolid Vault',
    itemSymbol: 'VLT',
    itemValue: 12489.51323
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
