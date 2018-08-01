import './VaultPanel.scss'
import { connect } from 'react-redux'
import ContentWrapper from '../../molecules/ContentWrapper'
import PropTypes from 'prop-types'
import React from 'react'
import VaultFees from '../VaultFees'
import VaultTitle from '../VaultTitle'
import VaultTransactions from '../VaultTransactions'
import WrapperWithDivider from '../../molecules/WrapperWithDivider'
import get from 'lodash/get'

const re = /vaults\/(.+)/i

let VaultPanel = ({ vaults, transactions, location, userType }) => {
  const vaultId = (location.match(re) || []).pop()
  // if there are no vaults OR if the Id is null, don't render
  if (!vaults || !vaultId) {
    return null
  }
  const selectedVaultData = Object.entries(vaults)
    .filter(([, data]) => data.id.toString() === vaultId)
    .pop()

  if (!selectedVaultData) {
    return null
  }

  const [vaultAddress, vaultData] = selectedVaultData
  const vaultTransactions =
    transactions && transactions[vaultAddress]
      ? transactions[vaultAddress]
      : null

  const divider = () => <div className="vault-panel-divider" />
  return (
    <div className="vault-panel">
      <ContentWrapper>
        <WrapperWithDivider Divider={divider}>
          <VaultTitle vault={vaultData} userType={userType} />
          <VaultFees vault={vaultData} userType={userType} />
          <VaultTransactions transactions={vaultTransactions} />
        </WrapperWithDivider>
      </ContentWrapper>
    </div>
  )
}

VaultPanel.propTypes = {
  vaults: PropTypes.object,
  transactions: PropTypes.object,
  location: PropTypes.string.isRequired,
  userType: PropTypes.string.isRequired
}

VaultPanel.defaultProps = {
  vaults: null,
  transactions: null
}

VaultPanel = connect(state => {
  const { currentAccount } = state.preferences
  return {
    transactions:
      currentAccount &&
      get(
        state,
        `blockChain.accounts[${currentAccount}].vaultTransactions`,
        null
      ),
    vaults:
      currentAccount &&
      get(state, `blockChain.accounts[${currentAccount}].vaults`, null),
    location: state.routing.location.pathname,
    userType: state.preferences.type
  }
})(VaultPanel)

export default VaultPanel
