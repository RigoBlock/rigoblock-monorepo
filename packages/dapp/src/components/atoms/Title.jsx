import * as React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import styles from './Title.scss'

const Title = props => (
  <h1 className={classnames(styles.title)}>{props.children}</h1>
)

Title.propTypes = {
  children: PropTypes.string.isRequired
  // classname: PropTypes.string.isRequired
}

export default Title
