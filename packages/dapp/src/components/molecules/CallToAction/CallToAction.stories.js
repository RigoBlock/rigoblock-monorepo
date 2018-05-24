import '../../_settings/_base.scss'
import { storiesOf } from '@storybook/react'
import { text, withKnobs } from '@storybook/addon-knobs/react'
import Button, { BUTTON_TYPES } from '../../atoms/Button'
import CallToAction from './CallToAction'
import React from 'react'

const testFunction = () => null

storiesOf('Molecules/CallToAction', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <CallToAction>
      <Button appearance={BUTTON_TYPES.PRIMARY} onClick={testFunction}>
        {text('button text', 'Cancel')}
      </Button>
      <Button appearance={BUTTON_TYPES.INVERTED} onClick={testFunction}>
        {text('button text', 'Save')}
      </Button>
    </CallToAction>
  ))
