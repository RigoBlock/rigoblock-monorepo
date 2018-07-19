import 'react-md/lib/Helpers'
import { Field } from 'redux-form'
import { reduxForm } from 'redux-form'
import PropTypes from 'prop-types'
import React from 'react'
import TextField from '../TextField'

const TextFieldForm = ({ fieldName, fieldProps }) => (
  <Field name={fieldName} component={TextField} {...fieldProps} />
)

TextFieldForm.propTypes = {
  fieldName: PropTypes.string.isRequired,
  fieldProps: PropTypes.object.isRequired
}

export default reduxForm({ form: 'testForm' })(TextFieldForm)
