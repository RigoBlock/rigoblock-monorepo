import 'react-md/lib/Helpers'
import { Field } from 'redux-form'
import PropTypes from 'prop-types'
import React from 'react'
import SelectField from '../SelectField'

const SelectFieldForm = ({ fieldName, fieldProps }) => (
  <Field name={fieldName} component={SelectField} {...fieldProps} />
)

SelectFieldForm.propTypes = {
  fieldName: PropTypes.string.isRequired,
  fieldProps: PropTypes.object.isRequired
}

export default SelectFieldForm
