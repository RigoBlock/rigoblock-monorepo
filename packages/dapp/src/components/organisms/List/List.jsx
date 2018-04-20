import React from 'react'
import PropTypes from 'prop-types'
import ListItem from '../../molecules/ListItem'

const List = ({ items }) => {
  const listItems = items.map(item => (
    <ListItem
      key={item.id}
      itemName={item.name}
      itemSymbol={item.symbol}
      itemValue={item.value}
      growth={item.growth}
      currencyGrowth={item.currencyGrowth}
    />
  ))
  return <div className="list">{listItems}</div>
}

List.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default List
