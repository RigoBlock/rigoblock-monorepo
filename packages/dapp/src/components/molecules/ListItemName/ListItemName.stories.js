import React from 'react'
import { storiesOf } from '@storybook/react'
import ListItemName from './ListItemName'
import '../../_settings/_base.scss'

storiesOf('Molecules/ListItemName', module)
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
  .add('default', () => <ListItemName symbol="VLT" name="Rocksolid Vault" />)
