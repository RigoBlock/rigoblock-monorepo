import './VaultFees.scss'
import BigNumber from 'bignumber.js'
import Button from '../../atoms/Button'
import PropTypes from 'prop-types'
import React from 'react'
import Title from '../../atoms/Title'

const VaultFees = ({ vault }) => {
  const transactionFee = vault.transactionFee.toFormat(2, BigNumber.ROUND_FLOOR)
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
  vault: PropTypes.object.isRequired
}

export default VaultFees
