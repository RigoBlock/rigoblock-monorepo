import './Tooltip.scss'
import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'

export const TOOLTIP_SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large'
}

const Tooltip = ({ size, type, onClick, tooltipText }) => {
  const classProps = classNames('material-icons', 'icon', size, {
    tooltip: !!tooltipText
  })
  return (
    <div className={classProps} onClick={onClick} tooltip={tooltipText}>
      {type}
    </div>
  )
}

Tooltip.propTypes = {
  type: PropTypes.string.isRequired,
  tooltipText: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.oneOf([
    TOOLTIP_SIZES.SMALL,
    TOOLTIP_SIZES.MEDIUM,
    TOOLTIP_SIZES.LARGE
  ])
}

Tooltip.defaultProps = {
  size: TOOLTIP_SIZES.MEDIUM,
  onClick: () => {},
  tooltipText: ''
}

export default Tooltip
