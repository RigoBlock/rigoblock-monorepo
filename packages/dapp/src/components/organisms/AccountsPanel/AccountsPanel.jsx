import './AccountsPanel.scss'
import { connect } from 'react-redux'
import AccountSummary from '../AccountSummary'
import ContentWrapper from '../../molecules/ContentWrapper'
import List from '../List'
import PanelHeader from '../../molecules/PanelHeader'
import PropTypes from 'prop-types'
import React from 'react'

const tooltip = 'List of all accounts'

let AccountsPanel = ({ accounts }) => {
  const values = Object.keys(accounts).map(accNum => ({
    provider: accounts[accNum].provider,
    number: accNum,
    balance: accounts[accNum].balance
  }))
  const header = <PanelHeader title={'Accounts'} tooltip={tooltip} />
  const divider = () => <div className="navbar-divider" />
  return (
    <div className="accounts-panel">
      <ContentWrapper header={header}>
        <List Component={AccountSummary} data={values} Divider={divider} />
      </ContentWrapper>
    </div>
  )
}

AccountsPanel.propTypes = {
  accounts: PropTypes.object.isRequired
}

AccountsPanel = connect(state => {
  console.log(state)
  return {
    accounts: state.user.blockChain.accounts
  }
})(AccountsPanel)

export default AccountsPanel
