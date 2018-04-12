import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Link from '../../atoms/Link'
import './UserMenu.scss'

const UserMenu = props => {
  return (
    <div className="user-menu">
      <Link to={'/preferences'}>Preferences</Link>
      <Link to={'/help'}>Help</Link>
    </div>
  )
}

export default UserMenu
