import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './Link.scss'

export const LINK_SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large'
}

const Link = props => {
  const { size, children, to } = props
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
  size: 'medium'
}

export default Link
