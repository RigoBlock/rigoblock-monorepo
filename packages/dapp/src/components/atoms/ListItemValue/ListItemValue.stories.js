import React from 'react'
import { storiesOf } from '@storybook/react'
import ListItemValue, { ITEM_VALUE_SIZES } from './ListItemValue'
import '../../_settings/_base.scss'

storiesOf('Atoms/ListItemValue', module)
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
    <ListItemValue value={'12,627384'} valueSize={ITEM_VALUE_SIZES.SMALL} />
  ))
  .add(ITEM_VALUE_SIZES.MEDIUM, () => (
    <ListItemValue value={'12,627384'} valueSize={ITEM_VALUE_SIZES.MEDIUM} />
  ))
  .add(ITEM_VALUE_SIZES.LARGE, () => (
    <ListItemValue value={'12,627384'} valueSize={ITEM_VALUE_SIZES.LARGE} />
  ))
