import PropTypes from 'prop-types'
import React from 'react'

const List = ({ className, Component, data }) => {
  const listItems = data.map((data, i) => <Component key={i} {...data} />)
  return <div className={className}>{listItems}</div>
}

List.propTypes = {
  className: PropTypes.string,
  Component: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired
}

List.defaultProps = {
  className: null
}

export default List
