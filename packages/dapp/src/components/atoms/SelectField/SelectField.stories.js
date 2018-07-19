import '../../_settings/_base.scss'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs/react'
import React from 'react'
import SelectField from './SelectField'

const props = {
  items: ['item1', 'item2', 'item3', 'item4', 'item5', 'item6'],
  placeholder: 'placeholder',
  id: '0',
  meta: {
    touched: null,
    error: null
  },
  input: {
    value: "I don't work",
    onChange: () => null
  }
}

storiesOf('Atoms/SelectField', module)
  .addDecorator(withKnobs)
  .add('default', () => <SelectField {...props} />)
