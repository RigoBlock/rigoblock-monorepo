import '../../_settings/_base.scss'
import { selectV2, text, withKnobs } from '@storybook/addon-knobs/react'
import { storiesOf } from '@storybook/react'
import React from 'react'
import TooltipIcon, { TOOLTIP_ICON_SIZES } from './TooltipIcon'

storiesOf('Atoms/TooltipIcon', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <TooltipIcon
      size={selectV2(
        'TooltipIcon size',
        TOOLTIP_ICON_SIZES,
        TOOLTIP_ICON_SIZES.SMALL
      )}
      type={text('Icon type', 'help')}
    >
      Small TooltipIcon
    </TooltipIcon>
  ))
