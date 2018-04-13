import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import UserMenu from '../../molecules/UserMenu'
import Link, { LINK_SIZES } from '../../atoms/Link'
import ROUTES from '../../../constants/routes'
import styles from './Navbar.scss'

const Navbar = () => (
  <div className="navbar">
    <Link to={ROUTES.DASHBOARD} size={LINK_SIZES.LARGE}>
      RigoBlock
    </Link>
    <UserMenu />
  </div>
)

export default Navbar
