import './ViewLink.scss'
import Link, { LINK_SIZES } from '../../atoms/Link'
import PropTypes from 'prop-types'
import React from 'react'
import Tooltip, { TOOLTIP_SIZES } from '../../atoms/Tooltip'
import classNames from 'classnames'

const ViewLink = ({ icon, link, className }) => {
  const classProps = classNames('view-link', className)
  return (
    <Link size={LINK_SIZES.MEDIUM} to={link.to} className={classProps}>
      <Tooltip type={icon} size={TOOLTIP_SIZES.SMALL} />
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
