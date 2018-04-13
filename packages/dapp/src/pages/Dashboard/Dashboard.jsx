import React, { Component } from 'react'
import TopNavbar from '../../components/organisms/TopNavbar'
import LeftNavbar from '../../components/organisms/LeftNavbar'

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard">
        <TopNavbar />
        <LeftNavbar />
      </div>
    )
  }
}

export default Dashboard
