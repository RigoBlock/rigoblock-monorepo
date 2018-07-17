import './VaultPanel.scss'
import { connect } from 'react-redux'
import AccountSummary from '../AccountSummary'
import ContentWrapper from '../../molecules/ContentWrapper'
import List from '../List'
import PanelHeader from '../../molecules/PanelHeader'
import PropTypes from 'prop-types'
import React from 'react'

const tooltip = 'List of all accounts'

let VaultPanel = ({ accounts }) => {
  const values = Object.entries(accounts).map(([accNum, data]) => ({
    provider: data.provider,
    number: accNum,
    balance: data.balance
  }))
  const header = <PanelHeader title={'Accounts'} tooltip={tooltip} />
  const divider = () => <div className="left-navbar-divider" />
  return (
    <div className="accounts-panel">
      <ContentWrapper header={header}>
        <List Component={AccountSummary} data={values} Divider={divider} />
      </ContentWrapper>
    </div>
  )
}

VaultPanel.propTypes = {
  accounts: PropTypes.object.isRequired
}

VaultPanel = connect(state => ({
  accounts: state.blockChain.accounts
}))(VaultPanel)

export default VaultPanel
