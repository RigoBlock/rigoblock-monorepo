import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './Link.scss'

const Link = props => {
  const { size, children, to } = props
  const classProps = classNames('link', `${size}-link`)
  return (
    <RouterLink to={to} className={classProps}>
      {children}
    </RouterLink>
  )
}

Link.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired
}

Link.defaultProps = {
  size: 'medium'
}

export default Link
