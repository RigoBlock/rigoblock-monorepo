import React from 'react'
import { storiesOf } from '@storybook/react'
import ItemValue, { ITEM_VALUE_SIZES } from './ItemValue'
import '../../_settings/_base.scss'

storiesOf('Atoms/ItemValue', module)
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
  .add(ITEM_VALUE_SIZES.SMALL, () => (
    <ItemValue itemValue={12489.51354} valueSize={ITEM_VALUE_SIZES.SMALL} />
  ))
  .add(ITEM_VALUE_SIZES.MEDIUM, () => (
    <ItemValue itemValue={12489.51354} valueSize={ITEM_VALUE_SIZES.MEDIUM} />
  ))
  .add(ITEM_VALUE_SIZES.LARGE, () => (
    <ItemValue itemValue={12489.51354} valueSize={ITEM_VALUE_SIZES.LARGE} />
  ))
  .add('growth', () => <ItemValue growth={0.25423} currencyGrowth={2.32} />)
