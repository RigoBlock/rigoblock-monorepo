import './ItemValue.scss'
import { BigNumber } from 'bignumber.js'
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
    .filter(k => {
      return props[k] && props[k].constructor.name === 'BigNumber'
    })
    .map(k => {
      return {
        [k]: props[k].toFormat(props.precision, BigNumber.ROUND_FLOOR)
      }
    })
    .reduce((acc, curr) => ({ ...acc, ...curr }), {})
}

const ItemValue = props => {
  const { valueSize, currencyGrowth, growth, currency } = props
  const res = roundProps(props)
  const classProps = classNames('item-value', valueSize)
  return growth && currencyGrowth ? (
    <div className="no-events">
      <span className={classProps}>{`+${res.growth}%`}</span>
      <span className={'currency-growth'}>{`+${
        res.currencyGrowth
      } ${currency}`}</span>
    </div>
  ) : (
    <div className="no-events">
      <span className={classProps}>{res.itemValue}</span>
    </div>
  )
}

ItemValue.propTypes = {
  itemValue: PropTypes.object,
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
