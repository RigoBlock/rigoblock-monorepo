import './BaseTemplate.scss'
import LeftNavbar from '../../organisms/LeftNavbar'
import PropTypes from 'prop-types'
import React from 'react'
import TopNavbar from '../../organisms/TopNavbar'
import classNames from 'classnames'

const BaseTemplate = ({ children, className }) => {
  const contentClass = classNames('page-main-content', className)
  return (
    <div>
      <TopNavbar />
      <div className="page-content-section">
        <LeftNavbar />
        <div className={contentClass}>{children}</div>
      </div>
    </div>
  )
}

BaseTemplate.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

BaseTemplate.defaultProps = {
  className: undefined
}

export default BaseTemplate
