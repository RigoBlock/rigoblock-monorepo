import './VaultPanel.scss'
import * as ROUTES from '../../../constants/routes'
import { INVESTOR } from '../../../constants/user'
import { connect } from 'react-redux'
import ContentWrapper from '../../molecules/ContentWrapper'
import PropTypes from 'prop-types'
import React from 'react'
import VaultFees from '../VaultFees'
import VaultTitle from '../VaultTitle'
import VaultTransactions from '../VaultTransactions'
import WrapperWithDivider from '../../molecules/WrapperWithDivider'

let VaultPanel = ({ vaults, transactions, location, userType }) => {
  if (location === ROUTES.VAULTS) {
    return null
  }
  const vaultId = location.split('/vaults/').pop()
  const [vaultAddress, vaultData] = Object.entries(vaults)
    .filter(([, data]) => data.id.toString() === vaultId)
    .pop()
  const vaultTransactions = transactions[vaultAddress]

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
  vaults: PropTypes.object.isRequired,
  transactions: PropTypes.object.isRequired,
  location: PropTypes.string.isRequired,
  userType: PropTypes.string
}

VaultPanel.defaultProps = {
  userType: INVESTOR
}

VaultPanel = connect(state => {
  const { currentAccount } = state.preferences
  return {
    transactions:
      currentAccount && state.blockChain.accounts[currentAccount]
        ? state.blockChain.accounts[currentAccount].vaultTransactions
        : {},
    vaults:
      currentAccount && state.blockChain.accounts[currentAccount]
        ? state.blockChain.accounts[currentAccount].vaults
        : {},
    location: state.routing.location.pathname,
    userType: state.preferences.type
  }
})(VaultPanel)

export default VaultPanel
