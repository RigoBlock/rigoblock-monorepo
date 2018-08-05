import PropTypes from 'prop-types'
import React, { Fragment } from 'react'

const WrapperWithDivider = ({ Divider, children }) => {
  let content = children
  if (Array.isArray(children)) {
    content = children.map(
      (Component, index) =>
        index !== children.length - 1 ? (
          <Fragment key={`wrap-div-${index}`}>
            {Component}
            <Divider />
          </Fragment>
        ) : (
          <Fragment key={`wrap-div-${index}`}>{Component}</Fragment>
        )
    )
  }

  return <div className="dividing-wrapper">{content}</div>
}

WrapperWithDivider.propTypes = {
  Divider: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]).isRequired
}

export default WrapperWithDivider
