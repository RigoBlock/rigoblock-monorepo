import './Icon.scss'
import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'

export const ICON_SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large'
}

const Icon = ({ size, type, onClick, tooltipText }) => {
  const classProps = classNames('material-icons', 'icon', size, {
    tooltip: !!tooltipText
  })
  return (
    <div className={classProps} onClick={onClick} tooltip={tooltipText}>
      {type}
    </div>
  )
}

Icon.propTypes = {
  type: PropTypes.string.isRequired,
  tooltipText: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.oneOf([ICON_SIZES.SMALL, ICON_SIZES.MEDIUM, ICON_SIZES.LARGE])
}

Icon.defaultProps = {
  size: ICON_SIZES.MEDIUM,
  onClick: () => {},
  tooltipText: ''
}

export default Icon
