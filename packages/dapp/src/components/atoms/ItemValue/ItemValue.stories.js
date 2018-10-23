import '../../_settings/_base.scss'
import { BigNumber } from 'bignumber.js'
import { select, text, withKnobs } from '@storybook/addon-knobs/react'
import { storiesOf } from '@storybook/react'
import ItemValue, { ITEM_VALUE_SIZES } from './ItemValue'
import React from 'react'

storiesOf('Atoms/ItemValue', module)
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <div
      style={{
        width: '400px',
        background: 'white',
        padding: '16px'
      }}
    >
      {story()}
    </div>
  ))
  .add('default', () => (
    <ItemValue
      itemValue={text('Item value', new BigNumber('12489.51354'))}
      valueSize={select('Value size', ITEM_VALUE_SIZES, ITEM_VALUE_SIZES.SMALL)}
    />
  ))
  .add('growth', () => (
    <ItemValue
      growth={text('Growth', new BigNumber('0.25423'))}
      currencyGrowth={text('Currency growth', new BigNumber('2.32'))}
    />
  ))
