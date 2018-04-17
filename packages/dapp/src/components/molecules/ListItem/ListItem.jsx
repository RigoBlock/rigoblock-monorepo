import React from 'react'
import PropTypes from 'prop-types'
import ItemName from '../ItemName'
import ItemValue, { ITEM_VALUE_SIZES } from '../../atoms/ItemValue'
import './ListItem.scss'

const ListItem = props => {
  const {
    growth,
    currencyGrowth,
    itemName,
    itemSymbol,
    valueSize,
    itemValue
  } = props
  return growth && currencyGrowth ? (
    <div className="list-item">
      <ItemName name={itemName} symbol={itemSymbol} />
      <ItemValue growth={growth} currencyGrowth={currencyGrowth} />
    </div>
  ) : (
    <div className="list-item">
      <ItemName name={itemName} symbol={itemSymbol} />
      <ItemValue itemValue={itemValue} valueSize={valueSize} />
    </div>
  )
}

ListItem.propTypes = {
  itemName: PropTypes.string.isRequired,
  itemSymbol: PropTypes.string.isRequired,
  itemValue: PropTypes.number,
  growth: PropTypes.number,
  currencyGrowth: PropTypes.number,
  itemStyle: PropTypes.string.isRequired,
  valueSize: PropTypes.string
}

ListItem.defaultProps = {
  valueSize: ITEM_VALUE_SIZES.SMALL,
  itemValue: 0,
  growth: 0,
  currencyGrowth: 0
}

export default ListItem
