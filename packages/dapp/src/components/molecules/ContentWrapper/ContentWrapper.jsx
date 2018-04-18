import React from 'react'
import PropTypes from 'prop-types'
import './ContentWrapper.scss'

const ContentWrapper = ({ header, children }) => {
  return (
    <div className="content-wrapper">
      <div className="content-wrapper-header">{header}</div>
      <div className="content-wrapper-content">{children}</div>
    </div>
  )
}

ContentWrapper.propTypes = {
  header: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired
}

export default ContentWrapper
