import './Tooltip.scss'
import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'

export const TOOLTIP_SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large'
}

const Tooltip = ({ size, type, onClick }) => {
  const classProps = classNames('material-icons', 'tooltip', size)
  return (
    <span className={classProps} onClick={onClick}>
      {type}
    </span>
  )
}

Tooltip.propTypes = {
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  size: PropTypes.oneOf([
    TOOLTIP_SIZES.SMALL,
    TOOLTIP_SIZES.MEDIUM,
    TOOLTIP_SIZES.LARGE
  ])
}

Tooltip.defaultProps = {
  size: TOOLTIP_SIZES.MEDIUM,
  onClick: () => {}
}

export default Tooltip
