import './ItemValue.scss'
import { BigNumber } from 'bignumber.js'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'
import classNames from 'classnames'

export const ITEM_VALUE_SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large'
}

const roundProps = props => {
  return Object.keys(props)
    .filter(
      k =>
        // we are filtering for BigNumbers
        typeof props[k] === 'object' &&
        Object.keys(props[k]).includes('c') &&
        _.isArray(props[k].c)
    )
    .map(k => ({
      [k]: props[k].toFormat(props.precision, BigNumber.ROUND_FLOOR)
    }))
    .reduce((acc, curr) => ({ ...acc, ...curr }), {})
}

const ItemValue = props => {
  const { valueSize, currencyGrowth, growth, currency } = props
  const res = roundProps(props)
  const classProps = classNames('item-value', valueSize)
  return growth.toNumber() && currencyGrowth.toNumber() ? (
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
  growth: PropTypes.object,
  currencyGrowth: PropTypes.object,
  valueSize: PropTypes.string,
  currency: PropTypes.string,
  precision: PropTypes.number
}

ItemValue.defaultProps = {
  valueSize: ITEM_VALUE_SIZES.LARGE,
  itemValue: new BigNumber(0),
  growth: new BigNumber(0),
  currencyGrowth: new BigNumber(0),
  precision: 2,
  currency: 'ETH'
}

export default ItemValue
