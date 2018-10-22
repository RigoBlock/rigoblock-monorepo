import '../../_settings/_base.scss'
import { select, text, withKnobs } from '@storybook/addon-knobs/react'
import { storiesOf } from '@storybook/react'
import Icon, { ICON_SIZES } from './Icon'
import React from 'react'

storiesOf('Atoms/Icon', module)
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
    <Icon
      size={select('Icon size', ICON_SIZES, ICON_SIZES.SMALL)}
      type={text('Icon type', 'help')}
    >
      Small Icon
    </Icon>
  ))
  .add('with text', () => (
    <Icon
      size={select('Icon size', ICON_SIZES, ICON_SIZES.SMALL)}
      type={text('Icon type', 'help')}
      tooltipText={text('Icon text', 'I am a tooltip!')}
    >
      Small Icon
    </Icon>
  ))
