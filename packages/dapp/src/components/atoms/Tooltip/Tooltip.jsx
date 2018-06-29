import './Tooltip.scss'
import PropTypes from 'prop-types'
import React from 'react'

export const ICON_SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large'
}

const Tooltip = ({ tooltipText }) => {
  return (
    <div className="tooltip-container">
      <div className="tooltip-text">{tooltipText}</div>
      <div className="tooltip-tip" />
    </div>
  )
}

Tooltip.propTypes = {
  tooltipText: PropTypes.string.isRequired
}

export default Tooltip
