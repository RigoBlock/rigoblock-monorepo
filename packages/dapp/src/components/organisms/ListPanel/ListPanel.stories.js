import '../../_settings/_base.scss'
import { BigNumber } from 'bignumber.js'
import { object, text, withKnobs } from '@storybook/addon-knobs/react'
import { storiesOf } from '@storybook/react'
import ListPanel from './ListPanel'
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
