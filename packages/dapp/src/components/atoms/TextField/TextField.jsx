import './TextField.scss'
import 'react-md/lib/Helpers'
import MaterialText from 'react-md/lib/TextFields'
import PropTypes from 'prop-types'
import React from 'react'

const TextField = ({
  id,
  type,
  required,
  fullWidth,
  size,
  input: { value, onChange },
  meta: { error, touched }
}) => {
  // TODO: figure out if we need to implement a label for future accessibility
  return (
    <MaterialText
      id={id}
      required={required}
      customSize="small"
      size={size}
      fullWidth={fullWidth}
      value={value}
      onChange={onChange}
      error={touched && !!error}
      errorText={error}
      type={type}
      className="text-field"
    />
  )
}

TextField.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  required: PropTypes.bool,
  fullWidth: PropTypes.bool,
  size: PropTypes.number,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired
}

TextField.defaultProps = {
  type: 'text',
  required: false,
  fullWidth: true,
  size: 10,
  value: '',
  onChange: () => {}
}

export default TextField
