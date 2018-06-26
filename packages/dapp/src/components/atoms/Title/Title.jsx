import './Title.scss'
import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'

export const TITLE_SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large'
}

const Title = ({ size, children, className }) => {
  const classProps = classNames('title', size, className)
  return <div className={classProps}>{children}</div>
}

Title.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  size: PropTypes.oneOf([
    TITLE_SIZES.SMALL,
    TITLE_SIZES.MEDIUM,
    TITLE_SIZES.LARGE
  ])
}

Title.defaultProps = {
  size: TITLE_SIZES.MEDIUM,
  className: null
}

export default Title
