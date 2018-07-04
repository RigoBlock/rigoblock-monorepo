import PropTypes from 'prop-types'
import React from 'react'

const List = ({ className, Component, data, Divider }) => {
  const listItems = data
    .map((data, i) => {
      const component = [<Component key={i} {...data} />]
      if (i > 0 && Divider) {
        component.unshift(<Divider key={`divider-${i}`} />)
      }
      return component
    })
    .reduce((acc, curr) => [...acc, ...curr], [])
  return <div className={className}>{listItems}</div>
}

List.propTypes = {
  className: PropTypes.string,
  Component: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  Divider: PropTypes.func
}

List.defaultProps = {
  className: null,
  Divider: null
}

export default List
