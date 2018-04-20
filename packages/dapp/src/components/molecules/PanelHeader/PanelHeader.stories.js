import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text } from '@storybook/addon-knobs/react'
import PanelHeader from './PanelHeader'
import '../../_settings/_base.scss'

storiesOf('Molecules/PanelHeader', module)
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
    <PanelHeader title={text('Panel Header', 'PanelHeader')} />
  ))
  .add('tooltip', () => (
    <PanelHeader
      title={text('Panel Header', 'PanelHeader')}
      tooltip={text('Tooltip', 'empty tooltip')}
    />
  ))
