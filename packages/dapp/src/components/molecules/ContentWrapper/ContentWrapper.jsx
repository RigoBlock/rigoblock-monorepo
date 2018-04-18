import React from 'react'
import PropTypes from 'prop-types'
import './ContentWrapper.scss'
import Tooltip from '../../atoms/Tooltip'

const ContentWrapper = props => {
  const { tooltip, children, title } = props
  const tooltipComponent = tooltip && <Tooltip type={'help'} />

  return (
    <div className="content-wrapper">
      <div className="content-wrapper-header">
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
