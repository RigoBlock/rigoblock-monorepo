import '../../_settings/_base.scss'
import { Provider } from 'react-redux'
import { reduxForm } from 'redux-form'
import { storiesOf } from '@storybook/react'
import { text, withKnobs } from '@storybook/addon-knobs/react'
import React from 'react'
import TextFieldWithTitle from './TextFieldWithTitle'
import mockStore from '../../../fixtures/store'

const store = mockStore()

const props = {
  tooltip: 'Name must be long max 30 characters',
  title: 'Vault name',
  fieldName: 'vaultName',
  fieldProps: {
    id: 'testTextField'
  }
}

const Component = reduxForm({ form: 'storyForm' })(TextFieldWithTitle)

storiesOf('Molecules/TextFieldWithTitle', module)
  .addDecorator(withKnobs)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .addDecorator(story => (
    <div
      style={{
        marginTop: '70px',
        height: '62px',
        background: 'white',
        width: '264px'
      }}
    >
      {story()}
    </div>
  ))
  .add('default', () => (
    <Component
      {...props}
      fieldProps={{
        id: 'testTextField',
        placeholder: text('text field placeholder', 'Click me')
      }}
    />
  ))
  .add('no Tooltip', () => (
    <Component
      {...props}
      tooltip=""
      fieldProps={{
        id: 'testTextField',
        placeholder: text('text field placeholder', 'Click me')
      }}
    />
  ))
  .add('shorter textField', () => (
    <Component
      {...props}
      fieldProps={{
        id: 'testTextField',
        fullWidth: false,
        size: text('text size', '15'),
        placeholder: text('text field placeholder', 'Click me')
      }}
    />
  ))
