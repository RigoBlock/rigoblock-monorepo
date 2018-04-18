import React from 'react'
import PropTypes from 'prop-types'
import ContentWrapper from '../../molecules/ContentWrapper'
import ListItem from '../../molecules/ListItem'

const ListPanel = props => {
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

ListPanel.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  tooltip: PropTypes.string
}

ListPanel.defaultProps = {
  tooltip: null
}

export default ListPanel
