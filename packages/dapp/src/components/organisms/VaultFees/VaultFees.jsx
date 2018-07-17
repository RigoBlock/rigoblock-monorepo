import './VaultFees.scss'
import { MANAGER } from '../../../constants/user'
import BigNumber from 'bignumber.js'
import Button from '../../atoms/Button'
import PropTypes from 'prop-types'
import React from 'react'
import Title from '../../atoms/Title'

const VaultFees = ({ vault, userType }) => {
  const transactionFee = vault.transactionFee.toFormat(2, BigNumber.ROUND_FLOOR)
  return userType === MANAGER ? (
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
  ) : (
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
    </div>
  )
}

VaultFees.propTypes = {
  vault: PropTypes.object.isRequired,
  userType: PropTypes.string.isRequired
}

export default VaultFees
