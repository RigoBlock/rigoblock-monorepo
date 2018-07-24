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
  placeholder,
  size,
  input,
  meta,
  maxLength
}) => {
  // TODO: figure out if we need to implement a label for future accessibility
  return (
    <MaterialText
      id={id}
      required={required}
      customSize="small"
      size={size}
      fullWidth={fullWidth}
      placeholder={placeholder}
      value={input ? input.value : null}
      onChange={input ? input.onChange : null}
      error={meta ? meta.touched && !!meta.error : null}
      errorText={meta ? meta.error : null}
      type={type}
      maxLength={maxLength}
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
  input: PropTypes.object,
  maxLength: PropTypes.number,
  meta: PropTypes.object,
  placeholder: PropTypes.string
}

TextField.defaultProps = {
  type: 'text',
  required: false,
  fullWidth: true,
  size: 10,
  value: '',
  placeholder: '',
  onChange: () => {},
  input: null,
  meta: null,
  maxLength: null
}

export default TextField
