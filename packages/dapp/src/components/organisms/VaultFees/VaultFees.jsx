import './VaultFees.scss'
import { connect } from 'react-redux'
import BigNumber from 'bignumber.js'
import Button from '../../atoms/Button'
import PropTypes from 'prop-types'
import React from 'react'
import Title from '../../atoms/Title'

let VaultFees = ({ vaultAddress, vaults }) => {
  let { transactionFee } = vaults[vaultAddress]
  transactionFee = transactionFee.toFormat(2, BigNumber.ROUND_FLOOR)
  return (
    <div className="vault-fees">
      <Title>Fees</Title>
      <div className="fee-info">
        <span>Management</span>
        <span>{`0.00%`}</span>
      </div>
      <div className="fee-info">
        <span>Entry</span>
        <span>{`${transactionFee}%`}</span>
      </div>
      <div className="fee-info">
        <span>Exit</span>
        <span>{`${transactionFee}%`}</span>
      </div>
      {/* TODO: add action to open modal */}
      <Button onClick={() => {}}>Edit Fees</Button>
    </div>
  )
}

VaultFees.propTypes = {
  vaultAddress: PropTypes.string.isRequired,
  vaults: PropTypes.object.isRequired
}

VaultFees = connect(state => {
  const { currentAccount } = state.preferences
  return {
    vaults:
      currentAccount && state.blockChain.accounts[currentAccount]
        ? state.blockChain.accounts[currentAccount].vaults
        : {}
  }
})(VaultFees)

export default VaultFees
