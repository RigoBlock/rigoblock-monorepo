import './SelectField.scss'
import 'react-md/lib/Helpers'
import MaterialSelect from 'react-md/lib/SelectFields'
import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'

const SelectField = ({
  id,
  items,
  placeholder,
  onChange,
  value,
  defaultValue
}) => {
  const classProps = classNames('select-field')
  const dropDownArrow = (
    <span className={'material-icons'}>keyboard_arrow_down</span>
  )
  return (
    <MaterialSelect
      id={id.toString()}
      placeholder={placeholder}
      defaultValue={defaultValue}
      value={value}
      onChange={onChange}
      stripActiveItem={false}
      repositionOnScroll={false}
      className={classProps}
      menuItems={items}
      position={MaterialSelect.Positions.BELOW}
      dropdownIcon={dropDownArrow}
    />
  )
}

SelectField.propTypes = {
  id: PropTypes.number.isRequired,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  items: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
      })
    ])
  ).isRequired
}

SelectField.defaultProps = {
  placeholder: null,
  defaultValue: '',
  value: '',
  onChange: () => {}
}

export default SelectField
