import './ItemName.scss'
import PropTypes from 'prop-types'
import React from 'react'

const ItemName = ({ symbol, name }) => {
  return (
    <div className="no-events">
      <span className="item-symbol">{symbol}</span>
      <span className="item-name">{name}</span>
    </div>
  )
}

ItemName.propTypes = {
  name: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired
}

export default ItemName
