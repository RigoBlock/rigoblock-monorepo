import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, selectV2 } from '@storybook/addon-knobs/react'
import '../../_settings/_base.scss'
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
