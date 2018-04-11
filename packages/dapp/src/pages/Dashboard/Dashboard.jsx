import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import './Dashboard.scss'

class Dashboard extends Component {
  render() {
    return (
      <div className="app-wrapper">
        <h1>Hello</h1>
        <Link to="/vault" className="link">
          Vault
        </Link>
      </div>
    )
  }
}

Dashboard.propTypes = {
  title: PropTypes.string.isRequired
}

export default Dashboard
