import '../../_settings/_base.scss'
import { storiesOf } from '@storybook/react'
import { text, withKnobs } from '@storybook/addon-knobs/react'
import ItemName from './ItemName'
import React from 'react'

storiesOf('Molecules/ItemName', module)
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
    <ItemName
      symbol={text('Symbol', 'VLT')}
      name={text('Name', 'Rocksolid Vault')}
    />
  ))
