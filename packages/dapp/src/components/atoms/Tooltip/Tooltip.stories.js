import '../../_settings/_base.scss'
import { selectV2, text, withKnobs } from '@storybook/addon-knobs/react'
import { storiesOf } from '@storybook/react'
import React from 'react'
import Tooltip, { TOOLTIP_SIZES } from './Tooltip'

storiesOf('Atoms/Tooltip', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <Tooltip
      size={selectV2('Tooltip size', TOOLTIP_SIZES, TOOLTIP_SIZES.SMALL)}
      type={text('Icon type', 'help')}
    >
      Small Tooltip
    </Tooltip>
  ))
