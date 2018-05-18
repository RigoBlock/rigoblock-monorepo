import './SelectField.scss'
import 'react-md/lib/Helpers'
import MaterialSelect from 'react-md/lib/SelectFields'
import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'

const SelectField = ({ id, items, placeholder }) => {
  const classProps = classNames('md-cell', 'select-field')
  const dropDownArrow = (
    <span className={'material-icons'}>keyboard_arrow_down</span>
  )
  return (
    <MaterialSelect
      id={id}
      placeholder={placeholder}
      className={classProps}
      menuItems={items}
      position={MaterialSelect.Positions.BELOW}
      dropdownIcon={dropDownArrow}
    />
  )
}

SelectField.propTypes = {
  id: PropTypes.number.isRequired,
  placeholder: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired
}

// ObjectMenuItem.propTypes = {
//   label: PropTypes.string.isRequired,
//   value: PropTypes.object.isRequired
// }

export default SelectField
