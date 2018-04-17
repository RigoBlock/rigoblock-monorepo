import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './ItemValue.scss'

export const ITEM_VALUE_SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large'
}

const ItemValue = props => {
  const value = Number.parseFloat(props.value).toFixed(2)
  const classProps = classNames('item-value', `item-value-${props.valueSize}`)
  return (
    <div>
      <span className={classProps}>{value}</span>
    </div>
  )
}

ItemValue.propTypes = {
  value: PropTypes.number.isRequired,
  symbol: PropTypes.string.isRequired,
  valueSize: PropTypes.string
}

ItemValue.defaultProps = {
  valueSize: ITEM_VALUE_SIZES.SMALL
}

export default ItemValue
