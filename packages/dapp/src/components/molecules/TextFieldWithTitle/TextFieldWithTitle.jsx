import './TextFieldWithTitle.scss'
import Icon from '../../atoms/Icon'
import PropTypes from 'prop-types'
import React from 'react'
import TextFieldForm from '../../atoms/TextFieldForm'
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
      <TextFieldForm fieldName={fieldName} fieldProps={fieldProps} />
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
