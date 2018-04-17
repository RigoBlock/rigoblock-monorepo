import React from 'react'
import { storiesOf } from '@storybook/react'
import { ITEM_VALUE_SIZES } from '../../atoms/ItemValue'
import ListItem from './ListItem'
import '../../_settings/_base.scss'

storiesOf('Molecules/ListItem', module)
  .addDecorator(story => (
    <div
      style={{
        width: '400px',
        background: 'white',
        border: '1px solid rgba(0, 0, 0, 0.1'
      }}
    >
      {story()}
    </div>
  ))
  .add('default', () => (
    <div>
      <ListItem
        itemSymbol="VLT"
        itemName="Rocksolid Vault"
        itemValue={'12489,51'}
        valueSize={ITEM_VALUE_SIZES.LARGE}
      />
      <ListItem
        itemSymbol="DRG"
        itemName="Drago name"
        growth={'0,25'}
        ethGrowth={'2,32'}
        valueSize={ITEM_VALUE_SIZES.LARGE}
      />
      <ListItem
        itemSymbol="VLT"
        itemName="Rocksolid Vault"
        itemValue={'12489,51'}
        valueSize={ITEM_VALUE_SIZES.LARGE}
      />
    </div>
  ))
