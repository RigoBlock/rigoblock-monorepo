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
    <ItemValue value={'12,627384'} valueSize={ITEM_VALUE_SIZES.SMALL} />
  ))
  .add(ITEM_VALUE_SIZES.MEDIUM, () => (
    <ItemValue value={'12,627384'} valueSize={ITEM_VALUE_SIZES.MEDIUM} />
  ))
  .add(ITEM_VALUE_SIZES.LARGE, () => (
    <ItemValue value={'12,627384'} valueSize={ITEM_VALUE_SIZES.LARGE} />
  ))
