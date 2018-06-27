import './TooltipIcon.scss'
import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'

export const TOOLTIP_ICON_SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large'
}

const TooltipIcon = ({ size, type, onClick }) => {
  const classProps = classNames('material-icons', 'tooltip-icon', size)
  return (
    <span className={classProps} onClick={onClick}>
      {type}
    </span>
  )
}

TooltipIcon.propTypes = {
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  size: PropTypes.oneOf([
    TOOLTIP_ICON_SIZES.SMALL,
    TOOLTIP_ICON_SIZES.MEDIUM,
    TOOLTIP_ICON_SIZES.LARGE
  ])
}

TooltipIcon.defaultProps = {
  size: TOOLTIP_ICON_SIZES.MEDIUM,
  onClick: () => {}
}

export default TooltipIcon
