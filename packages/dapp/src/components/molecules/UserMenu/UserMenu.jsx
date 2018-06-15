import './UserMenu.scss'
import * as ROUTES from '../../../constants/routes'
import Link, { LINK_SIZES } from '../../atoms/Link'
import React from 'react'

const UserMenu = () => {
  return (
    <div className="user-menu">
      <Link to={ROUTES.PREFERENCES} size={LINK_SIZES.small}>
        Preferences
      </Link>
      <Link to={ROUTES.HELP} size={LINK_SIZES.small}>
        Help
      </Link>
    </div>
  )
}

export default UserMenu
