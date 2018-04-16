import React from 'react'
import PropTypes from 'prop-types'
import './ContentWrapper.scss'

const ContentWrapper = props => {
  const hasTooltip = props.tooltip
  return hasTooltip ? (
    <div className="content-wrapper">
      <h1>{props.title}</h1>
      <i className="material-icons tooltip">help</i>
      <div className="content-wrapper-content">{props.children}</div>
    </div>
  ) : (
    <div className="content-wrapper">
      <h1>{props.title}</h1>
      <div className="content-wrapper-content">{props.children}</div>
    </div>
  )
}

ContentWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  tooltip: PropTypes.string
}

ContentWrapper.defaultProps = {
  tooltip: null
}

export default ContentWrapper
