import './SelectFieldWithTitle.scss'
import { Field } from 'redux-form'
import Icon from '../../atoms/Icon'
import PropTypes from 'prop-types'
import React from 'react'
import SelectField from '../../atoms/SelectField'
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
      <Field name={fieldName} component={SelectField} {...fieldProps} />
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
