import './AccountPanel.scss'
import { connect } from 'react-redux'
import AccountSummary from '../AccountSummary'
import ContentWrapper from '../../molecules/ContentWrapper'
import List from '../List'
import PanelHeader from '../../molecules/PanelHeader'
import PropTypes from 'prop-types'
import React from 'react'

let AccountPanel = ({ accounts }) => {
  const values = Object.keys(accounts).map(accNum => ({
    provider: accounts[accNum].provider,
    number: accNum,
    balance: accounts[accNum].balance
  }))
  // TODO: add proper tooltip
  const header = <PanelHeader title={'Accounts'} tooltip={'tooltip'} />
  const divider = () => <div className="navbar-divider" />
  return (
    <div className="account-panel">
      <ContentWrapper header={header}>
        <List Component={AccountSummary} data={values} Divider={divider} />
      </ContentWrapper>
    </div>
  )
}

AccountPanel.propTypes = {
  accounts: PropTypes.object.isRequired
}

AccountPanel = connect(state => ({
  accounts: state.user.blockChain.accounts
}))(AccountPanel)

export default AccountPanel
