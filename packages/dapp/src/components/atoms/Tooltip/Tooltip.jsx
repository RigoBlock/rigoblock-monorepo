import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import './Tooltip.scss'

export const TOOLTIP_SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large'
}

const Tooltip = ({ size, type }) => {
  const classProps = classNames('material-icons', 'tooltip', `tooltip-${size}`)
  return <span className={classProps}>{type}</span>
}

Tooltip.propTypes = {
  type: PropTypes.string.isRequired,
  size: PropTypes.oneOf([
    TOOLTIP_SIZES.SMALL,
    TOOLTIP_SIZES.MEDIUM,
    TOOLTIP_SIZES.LARGE
  ])
}

Tooltip.defaultProps = {
  size: TOOLTIP_SIZES.MEDIUM
}

export default Tooltip
