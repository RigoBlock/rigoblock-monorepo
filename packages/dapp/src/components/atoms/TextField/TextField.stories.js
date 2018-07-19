import '../../_settings/_base.scss'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs/react'
import React from 'react'
import TextField from './TextField'

const props = {
  id: 'testTextField',
  fullWidth: false,
  size: 10,
  meta: {
    touched: null,
    error: null
  },
  input: {
    value: "I don't work",
    onChange: () => null
  }
}

storiesOf('Atoms/TextField', module)
  .addDecorator(withKnobs)
  .add('default', () => <TextField {...props} />)
