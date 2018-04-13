import React from 'react'
import Link from '../../atoms/Link'
import ROUTES from '../../../constants/routes'
import './UserMenu.scss'

const UserMenu = () => {
  return (
    <div className="user-menu">
      <Link to={ROUTES.PREFERENCES}>Preferences</Link>
      <Link to={ROUTES.HELP}>Help</Link>
    </div>
  )
}

export default UserMenu
