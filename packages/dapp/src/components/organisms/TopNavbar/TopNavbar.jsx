import './TopNavbar.scss'
import * as ROUTES from '../../../constants/routes'
import Link, { LINK_SIZES } from '../../atoms/Link'
import React from 'react'
import UserMenu from '../../molecules/UserMenu'

const TopNavbar = () => (
  <div className="top-navbar">
    <Link to={ROUTES.DASHBOARD} size={LINK_SIZES.LARGE}>
      RigoBlock
    </Link>
    <UserMenu />
  </div>
)

export default TopNavbar
