import './ItemValue.scss'
import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'

export const ITEM_VALUE_SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large'
}

const roundProps = props => {
  return Object.keys(props)
    .filter(k => !isNaN(props[k]))
    .map(k => {
      if (props[k] % 1 !== 0) {
        return { [k]: parseFloat(props[k], 10).toFixed(props.precision) }
      }
      return { [k]: props[k] }
    })
    .reduce((acc, curr) => ({ ...acc, ...curr }), {})
}

const ItemValue = props => {
  const { valueSize, currencyGrowth, growth, currency } = props
  const res = roundProps(props)
  const classProps = classNames('item-value', `item-value-${valueSize}`)
  return growth && currencyGrowth ? (
    <div>
      <span className={classProps}>{`+${res.growth}%`}</span>
      <span className={'currency-growth'}>{`+${
        res.currencyGrowth
      } ${currency}`}</span>
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
