import '../../_settings/_base.scss'
import { selectV2, withKnobs } from '@storybook/addon-knobs/react'
import { storiesOf } from '@storybook/react'
import Button, { BUTTON_SIZES } from './Button'
import React from 'react'

storiesOf('Atoms/Button', module)
  .addDecorator(withKnobs)
  .add('default', () => <Button text={'example button'} />)
