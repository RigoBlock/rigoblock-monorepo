import React from 'react'
import PropTypes from 'prop-types'
import TopNavbar from '../../organisms/TopNavbar'
import LeftNavbar from '../../organisms/LeftNavbar'
import './BaseTemplate.scss'

const BaseTemplate = props => (
  <div>
    <TopNavbar />
    <div className="page-content-section">
      <LeftNavbar />
      <div className="page-main-content">{props.children}</div>
    </div>
  </div>
)

BaseTemplate.propTypes = {
  children: PropTypes.node.isRequired
}

export default BaseTemplate
