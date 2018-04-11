import * as React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './Navbar.scss'

const Navbar = props => <div className={styles.default}>{props.children}</div>

Navbar.propTypes = {
  children: PropTypes.node.isRequired
}

export default Navbar
