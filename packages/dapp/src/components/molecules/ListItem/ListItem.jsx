import React from 'react'
import PropTypes from 'prop-types'
import ListItemName from '../ListItemName'
import ListItemValue, { ITEM_VALUE_SIZES } from '../../atoms/ListItemValue'
import './ListItem.scss'

const ListItem = props => {
  return (
    <div className="list-item">
      <ListItemName name={props.itemName} symbol={props.itemSymbol} />
      <ListItemValue value={props.itemValue} valueSize={props.valueSize} />
    </div>
  )
}

ListItem.propTypes = {
  itemName: PropTypes.string.isRequired,
  itemSymbol: PropTypes.string.isRequired,
  itemValue: PropTypes.number.isRequired,
  itemStyle: PropTypes.string.isRequired,
  valueSize: PropTypes.string
}

ListItem.defaultProps = {
  valueSize: ITEM_VALUE_SIZES.SMALL
}

export default ListItem
