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
  const res = Object.keys(props)
    .map(k => ({ [k]: parseFloat(props[k], 10).toFixed(props.precision) }))
    .reduce((acc, curr) => ({ ...acc, ...curr }), {})
  const classProps = classNames('item-value', `item-value-${props.valueSize}`)
  return props.growth && props.currencyGrowth ? (
    <div>
      <span className={classProps}>{`+${res.growth}%`}</span>
      <span className={'currency-growth'}>{`+${res.currencyGrowth} ${
        props.currency
      }`}</span>
    </div>
  ) : (
    <div>
      <span className={classProps}>{res.itemValue}</span>
    </div>
  )
}

ItemValue.propTypes = {
  itemValue: PropTypes.number,
  growth: PropTypes.number,
  currencyGrowth: PropTypes.number,
  valueSize: PropTypes.string,
  currency: PropTypes.string,
  precision: PropTypes.number
}

ItemValue.defaultProps = {
  valueSize: ITEM_VALUE_SIZES.LARGE,
  itemValue: 0,
  growth: 0,
  currencyGrowth: 0,
  precision: 2,
  currency: 'ETH'
}

export default ItemValue
