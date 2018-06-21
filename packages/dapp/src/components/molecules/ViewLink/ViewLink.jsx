import './ViewLink.scss'
import Link, { LINK_SIZES } from '../../atoms/Link'
import PropTypes from 'prop-types'
import React from 'react'
import Tooltip, { TOOLTIP_SIZES } from '../../atoms/Tooltip'

const ViewLink = ({ icon, link }) => {
  return (
    <Link size={LINK_SIZES.MEDIUM} to={link.to} className={'view-link'}>
      <Tooltip type={icon} size={TOOLTIP_SIZES.SMALL} />
      <span>{link.text}</span>
    </Link>
  )
}

ViewLink.propTypes = {
  icon: PropTypes.string.isRequired,
  link: PropTypes.object.isRequired
}

export default ViewLink
