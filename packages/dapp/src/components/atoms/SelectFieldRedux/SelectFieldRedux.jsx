import './SelectFieldRedux.scss'
import 'react-md/lib/Helpers'
import { Field } from 'redux-form'
import PropTypes from 'prop-types'
import React from 'react'
import SelectField from '../SelectField'

const SelectFieldRedux = ({ fieldName, fieldProps }) => {
  /* eslint-disable react/prop-types */
  const renderSelectField = ({ input, meta: { touched, error } }) => {
    return (
      <SelectField
        {...fieldProps}
        value={input.value}
        onChange={input.onChange}
        error={touched && !!error}
        errorText={error}
      />
    )
  }

  return <Field name={fieldName} component={renderSelectField} />
}

SelectFieldRedux.propTypes = {
  fieldName: PropTypes.string.isRequired,
  fieldProps: PropTypes.shape(SelectField.propTypes).isRequired
}

export default SelectFieldRedux
