import React from 'react'
import { storiesOf } from '@storybook/react'
import ItemName from './ItemName'
import '../../_settings/_base.scss'

storiesOf('Molecules/ItemName', module)
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
  .add('default', () => <ItemName symbol="VLT" name="Rocksolid Vault" />)
