import './ViewLink.scss'
import Link, { LINK_SIZES } from '../../atoms/Link'
import PropTypes from 'prop-types'
import React from 'react'
import Tooltip, { ICON_SIZES } from '../../atoms/Icon'
import classNames from 'classnames'

const ViewLink = ({ icon, link, className }) => {
  const classProps = classNames('view-link', className)
  return (
    <Link size={LINK_SIZES.SMALL} to={link.to} className={classProps}>
      <Tooltip type={icon} size={ICON_SIZES.MEDIUM} />
      <span>{link.text}</span>
    </Link>
  )
}

ViewLink.propTypes = {
  icon: PropTypes.string.isRequired,
  link: PropTypes.object.isRequired,
  className: PropTypes.string
}

ViewLink.defaultProps = {
  className: ''
}

export default ViewLink
