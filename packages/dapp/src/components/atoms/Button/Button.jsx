import './Button.scss'
import MaterialButton from 'react-md/lib/Buttons'
import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'

export const BUTTON_TYPES = {
  PRIMARY: 'primary',
  INVERTED: 'inverted',
  SUCCESS: 'success',
  ERROR: 'error'
}

const TYPE_PROPS = {
  [BUTTON_TYPES.PRIMARY]: {
    inverted: false,
    class: 'base-button'
  },
  [BUTTON_TYPES.INVERTED]: {
    inverted: true,
    class: 'base-button'
  },
  [BUTTON_TYPES.SUCCESS]: {
    inverted: true,
    class: ['base-button', 'success-button']
  },
  [BUTTON_TYPES.ERROR]: {
    inverted: true,
    class: ['base-button', 'error-button']
  }
}

const Button = ({ children, type, onClick }) => {
  const styleProps = TYPE_PROPS[type]
  const classProps = classNames(...styleProps.class)
  return (
    <MaterialButton
      className={classProps}
      flat
      primary
      onClick={onClick}
      swapTheming={styleProps.inverted}
    >
      {children}
    </MaterialButton>
  )
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.oneOf([
    BUTTON_TYPES.PRIMARY,
    BUTTON_TYPES.INVERTED,
    BUTTON_TYPES.SUCCESS,
    BUTTON_TYPES.ERROR
  ])
}

Button.defaultProps = {
  type: BUTTON_TYPES.PRIMARY
}

export default Button
