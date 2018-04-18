import React from 'react'
import { storiesOf } from '@storybook/react'
import PanelHeader from './PanelHeader'
import '../../_settings/_base.scss'

storiesOf('Molecules/PanelHeader', module)
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
  .add('default', () => <PanelHeader title="PanelHeader" />)
  .add('tooltip', () => (
    <PanelHeader title="PanelHeader" tooltip="empty tooltip" />
  ))
