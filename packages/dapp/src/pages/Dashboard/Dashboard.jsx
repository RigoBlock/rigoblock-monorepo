import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Navbar from '../../components/organisms/Navbar'

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard">
        <Navbar />
      </div>
    )
  }
}

export default Dashboard
