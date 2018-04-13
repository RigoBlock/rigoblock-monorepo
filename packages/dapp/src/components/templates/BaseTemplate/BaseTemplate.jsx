import React from 'react'
import PropTypes from 'prop-types'
import TopNavbar from '../../organisms/TopNavbar'
import LeftNavbar from '../../organisms/LeftNavbar'
import './BaseTemplate.scss'

const BaseTemplate = props => (
  <div>
    <TopNavbar />
    <div className="content-section">
      <LeftNavbar />
      <div className="content">{props.children}</div>
    </div>
  </div>
)

BaseTemplate.propTypes = {
  children: PropTypes.node.isRequired
}

export default BaseTemplate
