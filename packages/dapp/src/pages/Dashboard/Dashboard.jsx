import './Dashboard.scss'
import AccountPanel from '../../components/organisms/AccountPanel'
import BaseTemplate from '../../components/templates/BaseTemplate'
import React, { Component } from 'react'
import VaultList from '../../components/organisms/VaultList'

class Dashboard extends Component {
  render() {
    return (
      <BaseTemplate className="dashboard">
        <AccountPanel />
        <VaultList />
      </BaseTemplate>
    )
  }
}

export default Dashboard
