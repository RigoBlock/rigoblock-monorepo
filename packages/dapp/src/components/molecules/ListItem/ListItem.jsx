import './ListItem.scss'
import ItemName from '../ItemName'
import ItemValue from '../../atoms/ItemValue'
import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'

const ListItem = ({
  growth,
  currencyGrowth,
  itemName,
  itemSymbol,
  itemValue,
  onClick,
  className,
  ...rest
}) => {
  const valueProps =
    growth && currencyGrowth ? { growth, currencyGrowth } : { itemValue }
  const classProps = classNames('list-item', className)
  return (
    <div className={classProps} onClick={onClick} {...rest}>
      <ItemName name={itemName} symbol={itemSymbol} />
      <ItemValue {...valueProps} />
    </div>
  )
}

ListItem.propTypes = {
  itemName: PropTypes.string.isRequired,
  itemSymbol: PropTypes.string.isRequired,
  itemValue: PropTypes.number,
  growth: PropTypes.number,
  className: PropTypes.string,
  onClick: PropTypes.func,
  currencyGrowth: PropTypes.number
}

ListItem.defaultProps = {
  itemValue: 0,
  growth: 0,
  currencyGrowth: 0,
  className: '',
  onClick: () => {}
}

export default ListItem
