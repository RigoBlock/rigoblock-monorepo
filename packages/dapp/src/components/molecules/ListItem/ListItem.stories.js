import React from 'react'
import { storiesOf } from '@storybook/react'
import ListItem from './ListItem'
import '../../_settings/_base.scss'

storiesOf('Molecules/ListItem', module)
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
      itemSymbol="VLT"
      itemName="Rocksolid Vault"
      itemValue={12489.51323}
    />
  ))
