import './ItemValue.scss'
import { BigNumber } from 'bignumber.js'
import { ETH } from '../../../constants/blockchain'
import { isBigNumber } from '../../../constants/utils'
import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'

export const ITEM_VALUE_SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
  XL: 'x-large'
}

export const roundProps = props =>
  Object.entries(props)
    .filter(([, value]) =>
      // we are filtering for BigNumbers
      // TODO: remove once BigNumber.isBigNumber(x) starts working
      isBigNumber(value)
    )
    .map(([key, value]) => ({
      // round to [props.precision] number of decimals, by defect
      [key]: value.toFormat(props.precision, BigNumber.ROUND_FLOOR)
    }))
    .reduce((acc, curr) => ({ ...acc, ...curr }), {})

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
  growth: PropTypes.object,
  currencyGrowth: PropTypes.object,
  valueSize: PropTypes.string,
  currency: PropTypes.string,
  precision: PropTypes.number
}

ItemValue.defaultProps = {
  valueSize: ITEM_VALUE_SIZES.LARGE,
  itemValue: new BigNumber('0'),
  growth: null,
  currencyGrowth: null,
  precision: 2,
  currency: ETH
}

export default ItemValue
