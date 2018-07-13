import PropTypes from 'prop-types'
import React from 'react'

const WrapperWithDivider = ({ Divider, children }) => {
  let content = children
  if (Array.isArray(children)) {
    content = children.map(
      (Component, index) =>
        index !== children.length - 1 ? (
          <div key={`wrap-div-${index}`}>
            {Component}
            <Divider />
          </div>
        ) : (
          <div key={`wrap-div-${index}`}>{Component}</div>
        )
    )
  }

  return <div>{content}</div>
}

WrapperWithDivider.propTypes = {
  Divider: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]).isRequired
}

export default WrapperWithDivider
