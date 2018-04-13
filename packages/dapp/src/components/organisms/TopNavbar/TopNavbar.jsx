import React from 'react'
import UserMenu from '../../molecules/UserMenu'
import Link, { LINK_SIZES } from '../../atoms/Link'
import ROUTES from '../../../constants/routes'
import './TopNavbar.scss'

const TopNavbar = () => (
  <div className="TopNavbar">
    <Link to={ROUTES.DASHBOARD} size={LINK_SIZES.LARGE}>
      RigoBlock
    </Link>
    <UserMenu />
  </div>
)

export default TopNavbar
