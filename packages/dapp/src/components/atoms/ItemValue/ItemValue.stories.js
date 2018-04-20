import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, number, selectV2 } from '@storybook/addon-knobs/react'
import ItemValue, { ITEM_VALUE_SIZES } from './ItemValue'
import '../../_settings/_base.scss'

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
      itemValue={number('Item value', 12489.51354)}
      valueSize={selectV2(
        'Value size',
        ITEM_VALUE_SIZES,
        ITEM_VALUE_SIZES.SMALL
      )}
    />
  ))
  .add('growth', () => (
    <ItemValue
      growth={number('Growth', 0.25)}
      currencyGrowth={number('Currency growth', 2.32)}
    />
  ))
