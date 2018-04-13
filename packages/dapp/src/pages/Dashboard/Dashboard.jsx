import React, { Component } from 'react'
import TopNavbar from '../../components/organisms/TopNavbar'
import NavigationLinks from '../../components/molecules/NavigationLinks'

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard">
        <TopNavbar />
        <NavigationLinks />
      </div>
    )
  }
}

export default Dashboard
