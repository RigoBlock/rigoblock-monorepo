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
  const { growth, ethGrowth, itemValue } = props
  const classProps = classNames('item-value', `item-value-${props.valueSize}`)
  return growth && ethGrowth ? (
    <div>
      <span
        className={'item-value item-value-large'}
      >{`+${growth.toLocaleString('it')}%`}</span>
      <span className={'eth-growth'}>{`+${ethGrowth.toLocaleString(
        'it'
      )} ETH`}</span>
    </div>
  ) : (
    <div>
      <span className={classProps}>{itemValue.toLocaleString('it')}</span>
    </div>
  )
}

ItemValue.propTypes = {
  itemValue: PropTypes.number,
  growth: PropTypes.number,
  ethGrowth: PropTypes.number,
  valueSize: PropTypes.string
}

ItemValue.defaultProps = {
  valueSize: ITEM_VALUE_SIZES.SMALL,
  itemValue: 0,
  growth: 0,
  ethGrowth: 0
}

export default ItemValue
