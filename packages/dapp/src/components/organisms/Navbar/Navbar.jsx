import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Link from '../../atoms/Link'
import styles from './Navbar.scss'

const Navbar = () => (
  <div className="default">
    <Link to={'/'} size={'large'}>
      RigoBlock
    </Link>
    <div>
      <Link to={'/preferences'}>Preferences</Link>
      <Link to={'/help'}>Help</Link>
    </div>
  </div>
)

export default Navbar
