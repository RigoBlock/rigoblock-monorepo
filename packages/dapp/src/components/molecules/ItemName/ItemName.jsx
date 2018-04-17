import React from 'react'
import PropTypes from 'prop-types'
import './ItemName.scss'

const ItemName = props => {
  return (
    <div>
      <span className="item-symbol">{props.symbol}</span>
      <span className="item-name">{props.name}</span>
    </div>
  )
}

ItemName.propTypes = {
  name: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired
}

export default ItemName
