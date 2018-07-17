import './VaultPanel.scss'
import { connect } from 'react-redux'
import ContentWrapper from '../../molecules/ContentWrapper'
import PropTypes from 'prop-types'
import React from 'react'
import VaultFees from '../VaultFees'
import VaultTitle from '../VaultTitle'
import VaultTransactions from '../VaultTransactions'
import WrapperWithDivider from '../../molecules/WrapperWithDivider'

let VaultPanel = ({ vaults, transactions, location }) => {
  const vaultId = location.split('/vaults/').pop()
  const [vaultAddress, vaultData] = Object.entries(vaults)
    .filter(([, data]) => data.id.toString() === vaultId)
    .pop()
  const vaultTransactions = transactions[vaultAddress]
  console.log(vaultTransactions)

  const divider = () => <div className="vault-panel-divider" />
  return (
    <div className="vault-panel">
      <ContentWrapper>
        <WrapperWithDivider Divider={divider}>
          <VaultTitle vault={vaultData} />
          <VaultFees vault={vaultData} />
          <VaultTransactions transactions={vaultTransactions} />
        </WrapperWithDivider>
      </ContentWrapper>
    </div>
  )
}

VaultPanel.propTypes = {
  vaults: PropTypes.object.isRequired,
  transactions: PropTypes.object.isRequired,
  location: PropTypes.string.isRequired
}

VaultPanel = connect(state => {
  const { currentAccount } = state.preferences
  return currentAccount && state.blockChain.accounts[currentAccount]
    ? {
        transactions:
          state.blockChain.accounts[currentAccount].vaultTransactions,
        vaults: state.blockChain.accounts[currentAccount].vaults,
        location: state.routing.location.pathname
      }
    : {
        transactions: {},
        vaults: {},
        location: state.routing.location.pathname
      }
})(VaultPanel)

export default VaultPanel
