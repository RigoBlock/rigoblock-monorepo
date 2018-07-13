import './Amount.scss'
import ItemValue from '../../atoms/ItemValue'
import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'

export const AMOUNT_SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
  XL: 'x-large'
}

const Amount = ({ value, symbol, valueSize, symbolSize }) => {
  const symbolClassProps = classNames('amount-symbol', symbolSize)
  return (
    <div className="amount">
      <div className={symbolClassProps}>{symbol}</div>
      <ItemValue itemValue={value} valueSize={valueSize} />
    </div>
  )
}

Amount.propTypes = {
  value: PropTypes.object.isRequired,
  symbol: PropTypes.string.isRequired,
  valueSize: PropTypes.oneOf([
    AMOUNT_SIZES.SMALL,
    AMOUNT_SIZES.MEDIUM,
    AMOUNT_SIZES.LARGE,
    AMOUNT_SIZES.XL
  ]),
  symbolSize: PropTypes.oneOf([
    AMOUNT_SIZES.SMALL,
    AMOUNT_SIZES.MEDIUM,
    AMOUNT_SIZES.LARGE,
    AMOUNT_SIZES.XL
  ])
}

Amount.defaultProps = {
  valueSize: AMOUNT_SIZES.SMALL,
  symbolSize: AMOUNT_SIZES.SMALL
}

export default Amount
