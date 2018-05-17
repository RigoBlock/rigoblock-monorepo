import MaterializeButton from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'

export const BUTTON_SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large'
}

const Button = ({ size, text }) => {
  const classProps = classNames('btn')
  return (
    <MaterializeButton variant="raised" classes={classProps}>
      {text}
    </MaterializeButton>
  )
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  size: PropTypes.oneOf([
    BUTTON_SIZES.SMALL,
    BUTTON_SIZES.MEDIUM,
    BUTTON_SIZES.LARGE
  ])
}

Button.defaultProps = {
  size: BUTTON_SIZES.MEDIUM
}

export default Button
