import 'react-md/lib/Helpers'
import { Field } from 'redux-form'
import { reduxForm } from 'redux-form'
import PropTypes from 'prop-types'
import React from 'react'
import TextField from '../TextField'

const TextFieldForm = ({ fieldName, textFieldProps }) => (
  <Field name={fieldName} component={TextField} {...textFieldProps} />
)

TextFieldForm.propTypes = {
  fieldName: PropTypes.string.isRequired,
  textFieldProps: PropTypes.object.isRequired
}

export default reduxForm({ form: 'testForm' })(TextFieldForm)
