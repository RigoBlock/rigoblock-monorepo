import '../../_settings/_base.scss'
import { number, text, withKnobs } from '@storybook/addon-knobs/react'
import { storiesOf } from '@storybook/react'
import ListItem from './ListItem'
import React from 'react'

storiesOf('Molecules/ListItem', module)
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <div
      style={{
        width: '400px',
        background: 'white',
        border: '1px solid rgba(0, 0, 0, 0.1)'
      }}
    >
      {story()}
    </div>
  ))
  .add('default', () => (
    <ListItem
      itemSymbol={text('Item Symbol', 'VLT')}
      itemName={text('Item Name', 'Rocksolid Vault')}
      itemValue={number('Item Value', 12489.51323)}
    />
  ))
