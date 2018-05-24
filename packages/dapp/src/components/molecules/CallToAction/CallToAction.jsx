import './CallToAction.scss'
import PropTypes from 'prop-types'
import React from 'react'

const CallToAction = ({ children }) => {
  return <div className="call-to-action">{children}</div>
}

CallToAction.propTypes = {
  children: PropTypes.node.isRequired
}

export default CallToAction
