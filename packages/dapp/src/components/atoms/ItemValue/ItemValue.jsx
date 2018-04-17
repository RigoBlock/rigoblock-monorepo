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
    .map(k => ({ [k]: parseFloat(props[k], 10).toFixed(2) }))
    .reduce((acc, curr) => ({ ...acc, ...curr }), {})
  console.log(res, props)
  const classProps = classNames('item-value', `item-value-${props.valueSize}`)
  return props.growth && props.currencyGrowth ? (
    <div>
      <span className={'item-value item-value-large'}>{`+${res.growth}%`}</span>
      <span className={'eth-growth'}>{`+${res.currencyGrowth} ETH`}</span>
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
  valueSize: PropTypes.string
}

ItemValue.defaultProps = {
  valueSize: ITEM_VALUE_SIZES.SMALL,
  itemValue: 0,
  growth: 0,
  currencyGrowth: 0
}

export default ItemValue
