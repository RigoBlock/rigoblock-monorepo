import React from 'react'
import PropTypes from 'prop-types'
import './ListItemName.scss'

const ListItemName = props => {
  return (
    <div>
      <span className="list-item-symbol">{props.symbol}</span>
      <span>{props.name}</span>
    </div>
  )
}

ListItemName.propTypes = {
  name: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired
}

export default ListItemName
