import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import UserMenu from '../../molecules/UserMenu'
import Link from '../../atoms/Link'
import styles from './Navbar.scss'

const Navbar = () => (
  <div className="navbar">
    <Link to={'/'} size={'large'}>
      RigoBlock
    </Link>
    <UserMenu />
  </div>
)

export default Navbar
