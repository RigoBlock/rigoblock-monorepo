import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './ListItemValue.scss'

export const ITEM_VALUE_SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large'
}

const ListItemValue = props => {
  const value = Number.parseFloat(props.value).toFixed(2)
  const classProps = classNames(
    'list-item-value',
    `list-item-value-${props.valueSize}`
  )
  return (
    <div>
      <span className={classProps}>{value}</span>
    </div>
  )
}

ListItemValue.propTypes = {
  value: PropTypes.number.isRequired,
  symbol: PropTypes.string.isRequired,
  valueSize: PropTypes.string
}

ListItemValue.defaultProps = {
  valueSize: ITEM_VALUE_SIZES.SMALL
}

export default ListItemValue
