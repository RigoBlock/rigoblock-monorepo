import './ContentWrapper.scss'
import PropTypes from 'prop-types'
import React from 'react'

const ContentWrapper = ({ header, children }) => {
  return (
    <div className="content-wrapper">
      {header ? <div className="content-wrapper-header">{header}</div> : null}
      <div className="content-wrapper-content">{children}</div>
    </div>
  )
}

ContentWrapper.propTypes = {
  header: PropTypes.node,
  children: PropTypes.node.isRequired
}

ContentWrapper.defaultProps = {
  header: null
}

export default ContentWrapper
