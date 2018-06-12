import BaseTemplate from '../../components/templates/BaseTemplate'
import React, { Component } from 'react'
import VaultList from '../../components/organisms/VaultList'

class Dashboard extends Component {
  render() {
    return (
      <BaseTemplate>
        <h1>Dashboard</h1>
        <VaultList />
      </BaseTemplate>
    )
  }
}

export default Dashboard
