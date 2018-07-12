import './WrapperWithDivider.scss'
import PropTypes from 'prop-types'
import React from 'react'
import isArray from 'lodash/isArray'

const WrapperWithDivider = ({ Divider, children }) => {
  let content = children
  console.log(children.length)
  if (isArray(children)) {
    content = children.map(
      (Component, index) =>
        index !== children.length - 1 ? (
          <div key={index} className="thisisthediv">
            {Component}
            <Divider />
          </div>
        ) : (
          Component
        )
    )
  }

  return <div>{content}</div>
}

WrapperWithDivider.propTypes = {
  Divider: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
}

export default WrapperWithDivider
