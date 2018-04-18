import React from 'react'
import PropTypes from 'prop-types'
import ContentWrapper from '../../molecules/ContentWrapper'
import ListItem from '../../molecules/ListItem'

const List = props => {
  const { title, items, tooltip } = props
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
  return (
    <ContentWrapper title={title} tooltip={tooltip}>
      {listItems}
    </ContentWrapper>
  )
}

List.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  tooltip: PropTypes.string
}

List.defaultProps = {
  tooltip: null
}

export default List
