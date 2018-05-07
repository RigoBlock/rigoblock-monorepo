import './Link.scss'
import { Link as RouterLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'

export const LINK_SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large'
}

const Link = ({ size, children, to }) => {
  const classProps = classNames('link', `link-${size}`)
  return (
    <RouterLink to={to} className={classProps}>
      {children}
    </RouterLink>
  )
}

Link.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  size: PropTypes.oneOf([LINK_SIZES.SMALL, LINK_SIZES.MEDIUM, LINK_SIZES.LARGE])
}

Link.defaultProps = {
  size: LINK_SIZES.MEDIUM
}

export default Link
