import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text } from '@storybook/addon-knobs/react'
import ItemName from './ItemName'
import '../../_settings/_base.scss'

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
