import '../../_settings/_base.scss'
import { selectV2, text, withKnobs } from '@storybook/addon-knobs/react'
import { storiesOf } from '@storybook/react'
import React from 'react'
import Tooltip, { TOOLTIP_SIZES } from './Tooltip'

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
    <Tooltip
      size={selectV2('Tooltip size', TOOLTIP_SIZES, TOOLTIP_SIZES.SMALL)}
      type={text('Icon type', 'help')}
    >
      Small Tooltip
    </Tooltip>
  ))
  .add('with text', () => (
    <Tooltip
      size={selectV2('Tooltip size', TOOLTIP_SIZES, TOOLTIP_SIZES.SMALL)}
      type={text('Icon type', 'help')}
      tooltipText={text('Tooltip text', 'I am a tooltip!')}
    >
      Small Tooltip
    </Tooltip>
  ))
