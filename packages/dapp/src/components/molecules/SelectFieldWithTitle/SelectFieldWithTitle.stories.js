import '../../_settings/_base.scss'
import { Provider } from 'react-redux'
import { reduxForm } from 'redux-form'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs/react'
import React from 'react'
import SelectFieldWithTitle from './SelectFieldWithTitle'
import mockStore from '../../../fixtures/store'

const store = mockStore()

const props = {
  tooltip: 'this is a test tooltip',
  title: 'Pay [mining] fees with',
  fieldProps: {
    id: 1,
    items: [
      'MetaMask **** 1604',
      'MetaMask **** 1605',
      'MetaMask **** 1606',
      'MetaMask **** 1607'
    ]
  }
}

const Component = reduxForm({ form: 'storyForm' })(SelectFieldWithTitle)

storiesOf('Molecules/SelectFieldWithTitle', module)
  .addDecorator(withKnobs)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .addDecorator(story => (
    <div
      style={{
        marginTop: '70px'
      }}
    >
      {story()}
    </div>
  ))
  .add('default', () => <Component {...props} />)
