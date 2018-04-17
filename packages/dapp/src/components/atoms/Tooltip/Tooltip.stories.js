import React from 'react'
import { storiesOf } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import '../../_settings/_base.scss'
import Tooltip, { TOOLTIP_SIZES } from './Tooltip'

storiesOf('Atoms/Tooltip', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(TOOLTIP_SIZES.SMALL, () => (
    <Tooltip size={TOOLTIP_SIZES.SMALL} type={'help'} to={'/'}>
      Small Tooltip
    </Tooltip>
  ))
  .add(TOOLTIP_SIZES.MEDIUM, () => (
    <Tooltip size={TOOLTIP_SIZES.MEDIUM} type={'help'} to={'/'}>
      Medium Tooltip
    </Tooltip>
  ))
  .add(TOOLTIP_SIZES.LARGE, () => (
    <Tooltip size={TOOLTIP_SIZES.LARGE} type={'help'} to={'/'}>
      Large Tooltip
    </Tooltip>
  ))
