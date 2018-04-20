import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, object } from '@storybook/addon-knobs/react'
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
