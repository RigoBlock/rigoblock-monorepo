import React from 'react'
import PropTypes from 'prop-types'
import './ContentWrapper.scss'

const ContentWrapper = props => {
  return (
    <div className="content-wrapper">
      <h1>{props.title}</h1>
      <div className="content-wrapper-content">{props.children}</div>
    </div>
  )
}

ContentWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

export default ContentWrapper
