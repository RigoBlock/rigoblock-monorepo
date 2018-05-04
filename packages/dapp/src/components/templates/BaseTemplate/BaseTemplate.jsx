import './BaseTemplate.scss'
import LeftNavbar from '../../organisms/LeftNavbar'
import PropTypes from 'prop-types'
import React from 'react'
import TopNavbar from '../../organisms/TopNavbar'

const BaseTemplate = ({ children }) => (
  <div>
    <TopNavbar />
    <div className="page-content-section">
      <LeftNavbar />
      <div className="page-main-content">{children}</div>
    </div>
  </div>
)

BaseTemplate.propTypes = {
  children: PropTypes.node.isRequired
}

export default BaseTemplate
