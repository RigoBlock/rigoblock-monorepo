import React from 'react'
import PropTypes from 'prop-types'
import PanelHeader from '../../molecules/PanelHeader'
import './ContentWrapper.scss'

const ContentWrapper = props => {
  const { tooltip, children, title } = props

  return (
    <div className="content-wrapper">
      <PanelHeader title={title} tooltip={tooltip} />
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
