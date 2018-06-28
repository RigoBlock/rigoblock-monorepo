import '../../_settings/_base.scss'
import { storiesOf } from '@storybook/react'
import { text, withKnobs } from '@storybook/addon-knobs/react'
import React from 'react'
import Tooltip from './Tooltip'

storiesOf('Atoms/Tooltip', module)
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <div
      style={{
        marginTop: '100px',
        marginLeft: '100px'
      }}
    >
      {story()}
    </div>
  ))
  .add('default', () => (
    <Tooltip tooltipText={text('Tooltip text', "Hello I'm a tooltip")} />
  ))
