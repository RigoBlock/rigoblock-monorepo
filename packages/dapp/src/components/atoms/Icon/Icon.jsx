import './Icon.scss'
import PropTypes from 'prop-types'
import React from 'react'
import Tooltip from '../Tooltip'
import classNames from 'classnames'

export const ICON_SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large'
}

const Icon = ({ size, type, onClick, tooltipText, className }) => {
  const classProps = classNames('material-icons', 'icon', size, className)
  return tooltipText ? (
    <div className={classProps} onClick={onClick}>
      <span className="tooltip-hover">{type}</span>
      <Tooltip tooltipText={tooltipText} />
    </div>
  ) : (
    <div className={classProps} onClick={onClick}>
      {type}
    </div>
  )
}

Icon.propTypes = {
  type: PropTypes.string.isRequired,
  tooltipText: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  size: PropTypes.oneOf([ICON_SIZES.SMALL, ICON_SIZES.MEDIUM, ICON_SIZES.LARGE])
}

Icon.defaultProps = {
  size: ICON_SIZES.MEDIUM,
  onClick: () => {},
  className: '',
  tooltipText: ''
}

export default Icon
