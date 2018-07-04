import './Dashboard.scss'
import AccountsPanel from '../../components/organisms/AccountsPanel'
import BaseTemplate from '../../components/templates/BaseTemplate'
import React, { Component } from 'react'
import VaultList from '../../components/organisms/VaultList'

class Dashboard extends Component {
  render() {
    return (
      <BaseTemplate className="dashboard">
        <AccountsPanel />
        <VaultList />
      </BaseTemplate>
    )
  }
}

export default Dashboard
