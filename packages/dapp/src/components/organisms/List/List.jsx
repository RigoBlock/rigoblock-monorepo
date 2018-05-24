import ListItem from '../../molecules/ListItem'
import PropTypes from 'prop-types'
import React from 'react'

const List = ({ items }) => {
  const listItems = items.map((item, i) => <ListItem key={i} {...item} />)
  return <div className="list">{listItems}</div>
}

List.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default List
