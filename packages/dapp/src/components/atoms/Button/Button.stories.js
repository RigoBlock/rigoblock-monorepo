import '../../_settings/_base.scss'
import { selectV2, withKnobs } from '@storybook/addon-knobs/react'
import { storiesOf } from '@storybook/react'
import Button, { BUTTON_TYPES } from './Button'
import React from 'react'

const testFunction = () => console.log('button got clicked!')

storiesOf('Atoms/Button', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <Button
      type={selectV2('Button type', BUTTON_TYPES, BUTTON_TYPES.PRIMARY)}
      onClick={testFunction}
    >
      Example Button
    </Button>
  ))
