import React from 'react'
import PropTypes from 'prop-types'
import ItemName from '../ItemName'
import ItemValue from '../../atoms/ItemValue'
import './ListItem.scss'

const ListItem = props => {
  const { growth, currencyGrowth, itemName, itemSymbol, itemValue } = props
  const valueProps =
    growth && currencyGrowth ? { growth, currencyGrowth } : { itemValue }
  return (
    <div className="list-item">
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
  currencyGrowth: PropTypes.number
}

ListItem.defaultProps = {
  itemValue: 0,
  growth: 0,
  currencyGrowth: 0
}

export default ListItem
