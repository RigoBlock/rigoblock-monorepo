import './TextFieldWithTitle.scss'
import { Field } from 'redux-form'
import Icon from '../../atoms/Icon'
import PropTypes from 'prop-types'
import React from 'react'
import TextField from '../../atoms/TextField'
import Title, { TITLE_SIZES } from '../../atoms/Title'

const TextFieldWithTitle = ({ tooltip, title, fieldName, fieldProps }) => {
  const tooltipComponent = tooltip && (
    <Icon type={'help'} tooltipText={tooltip} />
  )

  return (
    <div className="text-with-title">
      <div className="text-title">
        <Title size={TITLE_SIZES.SMALL}>{title}</Title>
        {tooltipComponent}
      </div>
      <Field name={fieldName} component={TextField} {...fieldProps} />
    </div>
  )
}

TextFieldWithTitle.propTypes = {
  title: PropTypes.string.isRequired,
  tooltip: PropTypes.string,
  fieldProps: PropTypes.object.isRequired,
  fieldName: PropTypes.string.isRequired
}

TextFieldWithTitle.defaultProps = {
  tooltip: null
}

export default TextFieldWithTitle
