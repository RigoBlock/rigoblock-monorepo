import './WrapperWithDivider.scss'
import PropTypes from 'prop-types'
import React from 'react'
import isArray from 'lodash/isArray'

const WrapperWithDivider = ({ Divider, children }) => {
  if (isArray(children)) {
    let content = children.map(
      (Component, index) =>
        index % 2 === 0 || index === children.length - 1 ? (
          <Component />
        ) : (
          <div key={index}>
            <Component />
            <Divider />
          </div>
        )
    )
  }
  const content = children

  return <div className="content-wrapper">{content}</div>
}

WrapperWithDivider.propTypes = {
  Divider: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired
}

export default WrapperWithDivider
