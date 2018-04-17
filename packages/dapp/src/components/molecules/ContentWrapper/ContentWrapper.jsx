import React from 'react'
import PropTypes from 'prop-types'
import './ContentWrapper.scss'

const ContentWrapper = props => {
  const { tooltip, children, title } = props

  const tooltipComponent = tooltip ? (
    <i className="material-icons tooltip">help</i>
  ) : null

  return (
    <div className="content-wrapper">
      <div className="header">
        <h1>{title}</h1>
        {tooltipComponent}
      </div>
      <div className="content-wrapper-content">{children}</div>
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
