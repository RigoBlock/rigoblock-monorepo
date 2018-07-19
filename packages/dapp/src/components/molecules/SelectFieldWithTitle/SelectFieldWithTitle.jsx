import './SelectFieldWithTitle.scss'
import Icon from '../../atoms/Icon'
import PropTypes from 'prop-types'
import React from 'react'
import SelectFieldForm from '../../atoms/SelectFieldForm'
import Title, { TITLE_SIZES } from '../../atoms/Title'

const SelectFieldWithTitle = ({ tooltip, title, fieldName, fieldProps }) => {
  const tooltipComponent = tooltip && (
    <Icon type={'help'} tooltipText={tooltip} />
  )

  return (
    <div className="select-with-title">
      <div className="select-title">
        <Title size={TITLE_SIZES.SMALL}>{title}</Title>
        {tooltipComponent}
      </div>
      <SelectFieldForm fieldName={fieldName} fieldProps={fieldProps} />
    </div>
  )
}

SelectFieldWithTitle.propTypes = {
  title: PropTypes.string.isRequired,
  tooltip: PropTypes.string,
  fieldProps: PropTypes.object.isRequired,
  fieldName: PropTypes.string.isRequired
}

SelectFieldWithTitle.defaultProps = {
  tooltip: null
}

export default SelectFieldWithTitle
