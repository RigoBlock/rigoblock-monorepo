import './Amount.scss'
import ItemValue from '../../atoms/ItemValue'
import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'

export const AMOUNT_SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large'
}

const Amount = ({ value, size, symbol }) => {
  const classProps = classNames('amount', size)
  return (
    <div className={classProps}>
      <div className="amount-symbol">{symbol}</div>
      <ItemValue itemValue={value} valueSize={size} />
    </div>
  )
}

Amount.propTypes = {
  value: PropTypes.object.isRequired,
  symbol: PropTypes.string.isRequired,
  size: PropTypes.oneOf([
    AMOUNT_SIZES.SMALL,
    AMOUNT_SIZES.MEDIUM,
    AMOUNT_SIZES.LARGE
  ])
}

Amount.defaultProps = {
  size: AMOUNT_SIZES.MEDIUM
}

export default Amount
