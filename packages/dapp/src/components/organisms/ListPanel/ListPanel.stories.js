import '../../_settings/_base.scss'
import { object, text, withKnobs } from '@storybook/addon-knobs/react'
import { storiesOf } from '@storybook/react'
import ListPanel from './ListPanel'
import React from 'react'

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
  .addDecorator(withKnobs)
  .addDecorator(story => <div style={{ width: '400px' }}>{story()}</div>)
  .add('default', () => (
    <ListPanel
      title={text('Title', 'Example ListPanel')}
      items={object('Items', items)}
    />
  ))
  .add('tooltip', () => (
    <ListPanel
      title={text('Title', 'Example ListPanel')}
      items={object('Items', items)}
      tooltip={text('Tooltip', 'empty tooltip')}
    />
  ))
