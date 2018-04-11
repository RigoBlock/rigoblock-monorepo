import * as React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './Title.scss'

export const TitleSize = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large'
}

const Title = props => {
  const { size } = props
  console.log(styles[size])
  const classProps = classNames(styles.title, styles[size])
  return <h1 className={classProps}>{props.children}</h1>
}

Title.propTypes = {
  children: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired
  // classname: PropTypes.string.isRequired
}

Title.defaultProps = {
  size: TitleSize.MEDIUM
}

export default Title
